import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Fly example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

const vcfTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/fly-latest.vcf.gz'
const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/FlyBase/fruitfly/tracks/All_Genes/{refseq}/trackData.jsonz'

export const Fly1: StoryObj<StaticArgs> = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly2: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly3: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly4: StoryObj<StaticArgs> = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly5: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly6: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly7: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly8: StoryObj<StaticArgs> = {
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly9: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:23974972..23989001',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly10: StoryObj<StaticArgs> = {
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0265700', 'FB:FBal0265699'],
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly11: StoryObj<StaticArgs> = {
  args: {
    locString: '2R:18614210..18615018',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0325512'],
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Fly12: StoryObj<StaticArgs> = {
  args: {
    locString: 'X:2023822..2043557',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0212726'],
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}
