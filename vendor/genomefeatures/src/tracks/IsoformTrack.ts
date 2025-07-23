import * as d3 from 'd3'

import { calculateNewTrackPosition, checkSpace } from '../RenderFunctions'
import {
  getJBrowseLink,
  renderTrackDescription,
} from '../services/TrackService'
import { generateSnvPoints } from '../services/VariantService'

import type { SimpleFeatureSerialized } from '../services/types'
import type { Region } from '../types'
import type { Selection } from 'd3'

export default class IsoformTrack {
  private trackData: SimpleFeatureSerialized[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
  private width: number
  private height: number
  private transcriptTypes: string[]
  private htpVariant?: string
  private region: Region
  private genome: string

  constructor({
    viewer,
    height,
    width,
    transcriptTypes,
    htpVariant,
    trackData,
    region,
    genome,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
    height: number
    width: number
    transcriptTypes: string[]
    htpVariant?: string
    trackData?: SimpleFeatureSerialized[]
    region: Region
    genome: string
  }) {
    this.trackData = trackData ?? []
    this.viewer = viewer
    this.width = width
    this.height = height
    this.transcriptTypes = transcriptTypes
    this.htpVariant = htpVariant
    this.region = region
    this.genome = genome
  }

  private renderTooltipDescription(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, any>,
    descriptionHtml: string,
    closeFunction: () => void,
  ) {
    tooltipDiv
      .transition()
      .duration(200)
      .style('width', 'auto')
      .style('height', 'auto')
      .style('opacity', 1)
      .style('visibility', 'visible')

    tooltipDiv
      .html(descriptionHtml)
      // @ts-expect-error
      .style('left', `${window.event!.pageX + 10}px`)
      // @ts-expect-error
      .style('top', `${window.event!.pageY + 10}px`)
      .append('button')
      .attr('type', 'button')
      .text('Close')
      .on('click', () => {
        closeFunction()
      })

    tooltipDiv
      .append('button')
      .attr('type', 'button')
      .html('&times;')
      .attr('class', 'tooltipDivX')
      .on('click', () => {
        closeFunction()
      })
  }

  DrawTrack() {
    let data = this.trackData
    const htpVariant = this.htpVariant
    const viewer = this.viewer
    const width = this.width
    const source = this.genome
    const chr = data[0]?.seqId

    const MAX_ROWS = 10

    const UTR_feats = ['UTR', 'five_prime_UTR', 'three_prime_UTR']
    const CDS_feats = ['CDS']
    const exon_feats = ['exon']
    const displayFeats = this.transcriptTypes

    const exon_height = 10 // will be white / transparent
    const cds_height = 10 // will be colored in
    const isoform_height = 40 // height for each isoform
    const isoform_title_height = 0 // height for each isoform
    const utr_height = 10 // this is the height of the isoform running all of the way through
    const transcript_backbone_height = 4 // this is the height of the isoform running all of the way through
    const arrow_height = 20
    const arrow_width = 10
    const arrow_points = `0,0 0,${arrow_height} ${arrow_width},${arrow_width}`

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const renderTooltipDescription = this.renderTooltipDescription

    const x = d3
      .scaleLinear()
      .domain([this.region.start, this.region.end])
      .range([0, width])

    // need to build a new sortWeight since these can be dynamic
    const sortWeight = {} as Record<string, number>
    for (let i = 0, len = UTR_feats.length; i < len; i++) {
      sortWeight[UTR_feats[i]] = 200
    }
    for (let i = 0, len = CDS_feats.length; i < len; i++) {
      sortWeight[CDS_feats[i]] = 1000
    }
    for (let i = 0, len = exon_feats.length; i < len; i++) {
      sortWeight[exon_feats[i]] = 100
    }

    data = data.sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1
      }
      if (!a.selected && b.selected) {
        return 1
      }
      // @ts-expect-error
      return a.name - b.name
    })

    const tooltipDiv = d3
      .select('body')
      .append('div')
      .attr('class', 'gfc-tooltip')
      .style('visibility', 'visible')
      .style('opacity', 0)

    const closeToolTip = () => {
      tooltipDiv
        .transition()
        .duration(100)
        .style('opacity', 10)
        .style('visibility', 'hidden')
    }

    if (htpVariant) {
      const variantContainer = viewer
        .append('g')
        .attr('class', 'variants track')
        .attr('transform', 'translate(0,22.5)')
      const [, fmin] = htpVariant.split(':')
      variantContainer
        .append('polygon')
        .attr('class', 'variant-SNV')
        .attr('points', generateSnvPoints(x(+fmin)))
        .attr('fill', 'red')
        .attr('x', x(+fmin))
        .attr('z-index', 30)
    }

    // Calculate where this track should go and translate it
    const newTrackPosition = calculateNewTrackPosition(this.viewer)
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    let row_count = 0
    const used_space = [] as string[][]
    let fmin_display = -1
    let fmax_display = -1
    const alreadyRendered = [] as string[] // hack fix for multiple transcript returns.

    for (let i = 0; i < data.length && row_count < MAX_ROWS; i++) {
      const feature = data[i]
      let featureChildren = feature.children
      if (featureChildren) {
        const selected = feature.selected

        // May want to remove this and add an external sort function
        // outside of the render method to put certain features on top.
        featureChildren = featureChildren.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })

        featureChildren.forEach(featureChild => {
          const featureType = featureChild.type

          if (alreadyRendered.includes(featureChild.id)) {
            return
          } else {
            alreadyRendered.push(featureChild.id)
          }

          if (displayFeats.includes(featureType)) {
            let current_row = checkSpace(
              used_space,
              x(featureChild.fmin),
              x(featureChild.fmax),
            )
            if (row_count < MAX_ROWS) {
              // An isoform container
              const isoform = track
                .append('g')
                .attr('class', 'isoform')
                .attr(
                  'transform',
                  `translate(0,${row_count * isoform_height + 10})`,
                )

              const transcriptStart = Math.max(x(featureChild.fmin), 0)
              const transcriptEnd = Math.min(x(featureChild.fmax), this.width)
              isoform
                .append('polygon')
                .datum(() => ({
                  strand: feature.strand,
                }))
                .attr('class', 'transArrow')
                .attr('points', arrow_points)
                .attr('transform', () =>
                  feature.strand > 0
                    ? `translate(${transcriptEnd},0)`
                    : `translate(${transcriptStart},${arrow_height}) rotate(180)`,
                )
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })

              isoform
                .append('rect')
                .attr('class', 'transcriptBackbone')
                .attr('y', 10 + isoform_title_height)
                .attr('height', transcript_backbone_height)
                .attr('transform', `translate(${transcriptStart},0)`)
                .attr('width', transcriptEnd - transcriptStart)
                .datum({
                  fmin: featureChild.fmin,
                  fmax: featureChild.fmax,
                })
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })
              let text_string = featureChild.name
              if (feature.name !== featureChild.name) {
                text_string += ` (${feature.name})`
              }
              let labelOffset = Math.max(x(featureChild.fmin), 0)
              const textLabel = isoform
                .append('svg:text')
                .attr('class', 'transcriptLabel')
                .attr('fill', selected ? 'sandybrown' : 'gray')
                .attr('opacity', selected ? 1 : 0.5)
                .attr('height', isoform_title_height)
                .attr('transform', `translate(${labelOffset},0)`)
                .text(text_string)
                .datum({
                  fmin: featureChild.fmin,
                })
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })

              let symbol_string_width = 100
              try {
                // @ts-expect-error
                symbol_string_width = textLabel.node()?.getBBox().width ?? 0
              } catch (e) {}
              if (symbol_string_width + labelOffset > this.width) {
                const diff = symbol_string_width + labelOffset - this.width
                labelOffset -= diff
                textLabel.attr('transform', `translate(${labelOffset},0)`)
              }

              // Now that the label has been created we can calculate the space that
              // this new element is taking up making sure to add in the width of
              // the box.
              // TODO: this is just an estimate of the length
              let textWidth = text_string.length * 2

              // not some instances (as in reactjs?) the bounding box isn't available, so we have to guess
              try {
                // @ts-expect-error
                textWidth = textLabel.node()?.getBBox().width ?? 0
              } catch (e) {
                console.error('Not yet rendered', e)
              }
              // First check to see if label goes past the end
              if (Number(textWidth + x(featureChild.fmin)) > width) {
                // console.error(featureChild.name + " goes over the edge");
              }
              const featEnd =
                textWidth > x(featureChild.fmax) - x(featureChild.fmin)
                  ? x(featureChild.fmin) + textWidth
                  : x(featureChild.fmax)

              // This is probably not the most efficient way to do this.
              // Making an 2d array... each row is the first array (no zer0)
              // next level is each element taking up space.
              // Also using colons as spacers seems very perl... maybe change that?
              // *** DANGER EDGE CASE ***/
              if (used_space[current_row]) {
                const temp = used_space[current_row]
                temp.push(`${x(featureChild.fmin)}:${featEnd}`)
                used_space[current_row] = temp
              } else {
                used_space[current_row] = [`${x(featureChild.fmin)}:${featEnd}`]
              }

              // Now check on bounds since this feature is displayed
              // The true end of display is converted to bp.
              if (fmin_display < 0 || fmin_display > featureChild.fmin) {
                fmin_display = featureChild.fmin
              }
              if (fmax_display < 0 || fmax_display < featureChild.fmax) {
                fmax_display = featureChild.fmax
              }
              if (featureChild.children) {
                // have to sort this so we draw the exons BEFORE the CDS
                featureChild.children = featureChild.children.sort(
                  function (a, b) {
                    const sortAValue = sortWeight[a.type]
                    const sortBValue = sortWeight[b.type]

                    if (
                      typeof sortAValue === 'number' &&
                      typeof sortBValue === 'number'
                    ) {
                      return sortAValue - sortBValue
                    }
                    if (
                      typeof sortAValue === 'number' &&
                      typeof sortBValue !== 'number'
                    ) {
                      return -1
                    }
                    if (
                      typeof sortAValue !== 'number' &&
                      typeof sortBValue === 'number'
                    ) {
                      return 1
                    }
                    // NOTE: type not found and weighted
                    return a.type.localeCompare(b.type)
                  },
                )

                featureChild.children.forEach(innerChild => {
                  const innerType = innerChild.type
                  // Skip feats out of bounds.
                  if (
                    x(innerChild.fmin) > this.width ||
                    x(innerChild.fmax) < 0
                  ) {
                    return // skip feat
                  }
                  const innerStart = Math.max(x(innerChild.fmin), 0)
                  const innerEnd = Math.min(x(innerChild.fmax), this.width)
                  if (exon_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'exon')
                      .attr('x', innerStart)
                      .attr(
                        'transform',
                        `translate(0,${
                          exon_height - transcript_backbone_height
                        })`,
                      )
                      .attr('height', exon_height)
                      .attr('z-index', 10)
                      .attr('width', innerEnd - innerStart)
                      .datum({
                        fmin: innerChild.fmin,
                        fmax: innerChild.fmax,
                      })
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                  } else if (CDS_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'CDS')
                      .attr('x', innerStart)
                      .attr(
                        'transform',
                        `translate(0,${
                          cds_height - transcript_backbone_height
                        })`,
                      )
                      .attr('z-index', 20)
                      .attr('height', cds_height)
                      .attr('width', innerEnd - innerStart)
                      .datum({
                        fmin: innerChild.fmin,
                        fmax: innerChild.fmax,
                      })
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                  } else if (UTR_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'UTR')
                      .attr('x', innerStart)
                      .attr(
                        'transform',
                        `translate(0,${
                          utr_height - transcript_backbone_height
                        })`,
                      )
                      .attr('z-index', 20)
                      .attr('height', utr_height)
                      .attr('width', innerEnd - innerStart)
                      .datum({
                        fmin: innerChild.fmin,
                        fmax: innerChild.fmax,
                      })
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                  }
                })
              }
              row_count += 1
            }
            if (row_count === MAX_ROWS) {
              const link = getJBrowseLink(
                source,
                chr,
                this.region.start,
                this.region.end,
              )
              ++current_row
              track
                .append('a')
                .attr('class', 'transcriptLabel')
                .attr('xlink:show', 'new')
                .append('text')
                .attr('x', 10)
                .attr(
                  'transform',
                  `translate(0,${row_count * isoform_height + 10})`,
                )
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('height', isoform_title_height)
                .html(link)
            }
          }
        })
      }
    }

    if (row_count === 0) {
      track
        .append('text')
        .attr('x', 30)
        .attr('y', isoform_title_height + 10)
        .attr('fill', 'orange')
        .attr('opacity', 0.6)
        .text(
          'Overview of non-coding genome features unavailable at this time.',
        )
    }
    // we return the appropriate height function
    return row_count * isoform_height
  }
}
