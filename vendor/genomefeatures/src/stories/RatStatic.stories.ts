import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Rat example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/RGD/rat/tracks/All_Genes/{refseq}/trackData.jsonz'
const vcfTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/RGD/rat/tracks/All_Genes/{refseq}/trackData.jsonz'
export const Rat1: StoryObj<StaticArgs> = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Rat2: StoryObj<StaticArgs> = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Rat3: StoryObj<StaticArgs> = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}

export const Rat4: StoryObj<StaticArgs> = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl,
  } satisfies StaticArgs,
}
