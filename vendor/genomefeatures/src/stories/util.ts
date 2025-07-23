import {
  GenomeFeatureViewer,
  fetchApolloAPIData,
  fetchNCListData,
  fetchTabixVcfData,
} from '../genomefeatures'
import { TrackType } from '../tracks/TrackTypeEnum'
import { parseLocString } from '../util'

const BASE_URL = 'https://www.alliancegenome.org/apollo'

export function createElement(id: string) {
  const div = document.createElement('div')
  div.className = 'viewer-border'
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttributeNS(
    'http://www.w3.org/2000/xmlns/',
    'xmlns:xlink',
    'http://www.w3.org/1999/xlink',
  )
  svg.id = id
  div.append(svg)
  return div
}

export interface StaticArgs {
  locString: string
  genome: string
  divId?: string
  type: TrackType
  showVariantLabel?: boolean
  variantFilter?: string[]
  isoformFilter?: string[]
  initialHighlight?: string[]
  showVariants?: boolean
  vcfTabixUrl?: string
  ncListUrlTemplate: string
}
export function createExampleStatic({
  locString,
  genome,
  divId = 'mysvg',
  type,
  showVariantLabel,
  variantFilter,
  isoformFilter,
  ncListUrlTemplate,
  vcfTabixUrl,
}: StaticArgs) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ;(async () => {
    const region = parseLocString(locString)
    const trackData = await fetchNCListData({
      region,
      urlTemplate: ncListUrlTemplate,
    })
    const variantData = vcfTabixUrl
      ? await fetchTabixVcfData({
          url: vcfTabixUrl,
          region,
        })
      : undefined

    setTimeout(() => {
      new GenomeFeatureViewer(
        {
          region,
          showVariantLabel,
          variantFilter,
          genome,
          isoformFilter,
          tracks: [
            {
              type,
              trackData,
              variantData,
            },
          ],
        },
        `#${divId}`,
        900,
        500,
      )
    }, 1)
  })()

  // on your page, this is a existing svg node with given id
  // e.g. <svg id="mysvg"/>
  return createElement(divId)
}

export interface ApolloArgs {
  locString: string
  genome: string
  divId?: string
  type: TrackType
  trackName?: string
  showVariantLabel?: boolean
  variantFilter?: string[]
  isoformFilter?: string[]
  initialHighlight?: string[]
  showVariants?: boolean
}

export function createExampleApollo({
  locString,
  genome,
  divId = 'mysvg',
  type,
  trackName = 'All Genes',
  showVariantLabel,
  variantFilter,
  isoformFilter,
  showVariants = true,
}: {
  locString: string
  genome: string
  divId: string
  type: TrackType
  trackName?: string
  showVariantLabel?: boolean
  variantFilter?: string[]
  isoformFilter?: string[]
  initialHighlight?: string[]
  showVariants?: boolean
}) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ;(async () => {
    const region = parseLocString(locString)
    const trackData = await fetchApolloAPIData({
      region,
      genome,
      track: trackName,
      baseUrl: `${BASE_URL}/track/`,
    })
    const variantData = showVariants
      ? await fetchApolloAPIData({
          region,
          genome,
          track: 'Variants',
          baseUrl: `${BASE_URL}/vcf/`,
        })
      : undefined

    setTimeout(() => {
      new GenomeFeatureViewer(
        {
          region,
          showVariantLabel,
          variantFilter,
          genome,
          isoformFilter,
          tracks: [
            {
              type,
              trackData,
              variantData,
            },
          ],
        },
        `#${divId}`,
        900,
        500,
      )
    }, 1)
  })()
  return createElement(divId)
}
