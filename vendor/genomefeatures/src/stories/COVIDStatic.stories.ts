import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'COVID example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/tracks/All Genes/{refseq}/trackData.jsonz'

export const Simple: StoryObj<StaticArgs> = {
  args: {
    locString: 'NC_045512.2:17894..28259',
    genome: 'SARS-CoV-2',
    type: TRACK_TYPE.ISOFORM,
    ncListUrlTemplate,
  } satisfies StaticArgs,
}
