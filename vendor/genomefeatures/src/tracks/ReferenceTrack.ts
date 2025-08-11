import * as d3 from 'd3'

import type { Selection } from 'd3'

interface Track {
  start: number
  end: number
  chromosome: string
  range: [number, number]
}

interface ReferenceTrackProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
  track: Track
  height: number
  width: number
}

export default class ReferenceTrack {
  private refSeq = ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
  private width: number
  private height: number
  private track: Track

  constructor({ viewer, track, height, width }: ReferenceTrackProps) {
    this.viewer = viewer
    this.width = width
    this.height = height
    this.track = track
  }

  DrawScrollableTrack() {
    const viewer = this.viewer
    const data = this.refSeq

    const x = d3
      .scaleLinear()
      .domain([this.track.start, this.track.end + 1])
      .range(this.track.range)

    const xAxis = d3
      .axisBottom(x)
      .tickValues(this._getRefTick(this.track.start + 1, this.track.end))
      .tickFormat((_d, i) => data[i])
      .tickSize(8)
      .tickSizeInner(8)
      .tickPadding(6)

    const numTicks = Math.floor(data.length / 10)
    const xAxisNumerical = d3
      .axisTop(x)
      .ticks(numTicks)
      .tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10))

    viewer
      .append('g')
      .attr('class', 'axis x-local-axis track')
      .attr('width', this.track.range[1])
      .attr('transform', 'translate(0, 20)')
      .call(xAxis)

    viewer
      .append('g')
      .attr('class', 'axis x-local-numerical track')
      .attr('width', this.track.range[1])
      .attr('transform', 'translate(0, 20)')
      .call(xAxisNumerical)

    const numericTickLabel = d3.selectAll('.x-local-numerical .tick text')
    numericTickLabel.first().attr('text-anchor', 'start')
    numericTickLabel.last().attr('text-anchor', 'end')

    d3.selectAll('.x-local-axis .tick text').each(function () {
      const tick = d3.select(this)
      const text = tick.text()
      let rectClass = 'nucleotide nt-a'
      if (text === 'T') {
        rectClass = 'nucleotide nt-t'
      } else if (text === 'C') {
        rectClass = 'nucleotide nt-c'
      } else if (text === 'G') {
        rectClass = 'nucleotide nt-g'
      }

      // @ts-expect-error
      d3.select(this.parentNode)
        .append('rect')
        .attr('class', rectClass)
        .attr('transform', 'translate(-8,8)')
    })
  }

  DrawOverviewTrack(): void {
    const viewer = this.viewer
    const view_start = this.track.start
    const view_end = this.track.end
    const width = this.width

    const x = d3
      .scaleLinear()
      .domain([view_start, view_end])
      .range(this.track.range)

    const xAxis = d3.axisTop(x).ticks(8, 's').tickSize(8)

    viewer
      .append('g')
      .attr('class', 'axis track')
      .attr('width', width)
      .attr('height', 20)
      .attr('transform', 'translate(0,20)')
      .call(xAxis)
  }

  private _getRefTick(start: number, end: number, skip?: number): number[] {
    return skip
      ? new Array(Math.ceil((end - start + 1) / 10))
          .fill(0)
          .map((_, idx) => start + idx * 10)
      : new Array(end - start + 1).fill(0).map((_, idx) => start + idx)
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
    try {
      // this.refSeq = await apolloService.GetLocalSequence(
      //  '',
      //  track['chromosome'],
      //  track['start'],
      //  track['end'],
      // )
    } catch (err) {
      console.error(err)
    }
  }
}
