import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Mouse example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta
const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/MGI/mouse/tracks/All_Genes/{refseq}/trackData.jsonz'
const vcfTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/mouse-latest.vcf.gz'

export const Mouse1: StoryObj<StaticArgs> = {
  args: {
    locString: '18:11035719..11058885',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse2: StoryObj<StaticArgs> = {
  args: {
    locString: '18:11042037..11052567',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse3: StoryObj<StaticArgs> = {
  args: {
    locString: '17:46007760..46041588',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse4: StoryObj<StaticArgs> = {
  args: {
    locString: '11:69550420..69563869',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse5: StoryObj<StaticArgs> = {
  args: {
    locString: '3:115707662..115717830',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse6: StoryObj<StaticArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse7: StoryObj<StaticArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Mouse8: StoryObj<StaticArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}
