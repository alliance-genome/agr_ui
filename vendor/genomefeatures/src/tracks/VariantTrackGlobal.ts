import * as d3 from 'd3'

import { calculateNewTrackPosition } from '../RenderFunctions'
import { Region } from '../types'

import type { Selection } from 'd3'

interface Track {
  range: [number, number]
}

interface Variant {
  position: number
}

export default class VariantTrackGlobal {
  private variants: Variant[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
  private width: number
  private height: number
  private track: Track
  private region: Region

  constructor({
    viewer,
    track,
    height,
    width,
    region,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
    track: Track
    height: number
    width: number
    region: Region
  }) {
    this.variants = []
    this.region = region
    this.viewer = viewer
    this.width = width
    this.height = height
    this.track = track
  }

  DrawTrack(): void {
    const viewer = this.viewer
    const variants = this.variants
    const x = d3
      .scaleLinear()
      .domain([this.region.start, this.region.end])
      .range(this.track.range)
    const triangle = d3.symbol().type(d3.symbolTriangle).size(20)

    const trackHeight = 20
    const newTrackPosition = calculateNewTrackPosition(this.viewer)

    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    track
      .append('rect')
      .attr('height', trackHeight)
      .attr('width', -this.track.range[0] + this.track.range[1])
      .attr('fill-opacity', 0.1)
      .attr('fill', 'rgb(148, 140, 140)')
      .attr('stroke-width', 0)
      .attr('stroke-opacity', 0)

    track
      .selectAll('path')
      .data(variants)
      .enter()
      .append('path')
      .attr('d', triangle)
      .attr('class', 'global-variant')
      .attr('stroke', 'red')
      .attr('fill', 'red')
      .attr('transform', (d: Variant) => `translate(${x(d.position)},10)`)
  }

  async getTrackData(): Promise<void> {
    // this.variants = await new ApolloService().GetFakeGlobalVariants()
  }
}
