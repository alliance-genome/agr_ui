import { TabixIndexedFile } from '@gmod/tabix'
import VCFParser from '@gmod/vcf'
import { RemoteFile } from 'generic-filehandle2'

import VCFFeature from './VcfFeature'

import type { VariantFeature } from './services/VariantService'
import type { Region } from './types'

export async function fetchTabixVcfData({
  url,
  indexUrl,
  indexType = 'TBI',
  region,
}: {
  url: string
  indexUrl?: string
  indexType?: string
  region: Region
}) {
  const idx = indexUrl ?? url + (indexType === 'TBI' ? '.tbi' : '.csi')
  const store = new TabixIndexedFile({
    tbiFilehandle: indexType === 'TBI' ? new RemoteFile(idx) : undefined,
    csiFilehandle: indexType === 'CSI' ? new RemoteFile(idx) : undefined,
    filehandle: new RemoteFile(url),
  })
  const parser = new VCFParser({
    header: await store.getHeader(),
  })
  const feats = [] as VariantFeature[]
  let i = 0
  await store.getLines(region.chromosome, region.start, region.end, {
    lineCallback: line => {
      const variant = parser.parseLine(line)
      const f = new VCFFeature({
        variant,
        parser,
        id: `${i++}`,
      })
      const info = f.get('INFO') as Record<string, string[]>
      // @ts-expect-error
      feats.push({
        id: f.get('ID'),
        reference_allele: f.get('REF'),
        alternative_alleles: { values: f.get('ALT') },
        name: f.get('name'),
        seqId: f.get('refName'),
        fmin: f.get('start'),
        fmax: f.get('end'),
        strand: 1,
        source: '',
        type: stripQuotes(info.soTerm[0]) ?? f.get('type'),
        ...Object.fromEntries(
          Object.entries(info).map(([key, val]) => [
            key,
            {
              values: [JSON.stringify(val.map(v => stripQuotes(v)))],
            },
          ]),
        ),
      })
    },
  })
  return feats
}

function stripQuotes(s?: string) {
  return s?.replace(/['"]+/g, '')
}
