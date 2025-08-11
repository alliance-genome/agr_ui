import {
  GenomeFeatureViewer,
  fetchNCListData,
  fetchTabixVcfData,
} from '../genomefeatures'

import type { Meta, StoryObj } from '@storybook/html'

function createElement(id: string) {
  const container = document.createElement('div')
  container.style.marginTop = '20px'

  const viewerDiv = document.createElement('div')
  viewerDiv.className = 'viewer-border'

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttributeNS(
    'http://www.w3.org/2000/xmlns/',
    'xmlns:xlink',
    'http://www.w3.org/1999/xlink',
  )
  svg.id = id
  viewerDiv.append(svg)
  container.append(viewerDiv)

  // Add loading indicator
  const loading = document.createElement('div')
  loading.innerHTML = 'Loading data from S3...'
  loading.style.padding = '10px'
  container.prepend(loading)

  return {
    container,
    loading,
  }
}

interface VariantViewerArgs {
  chromosome: string
  start: number
  end: number
  organism: 'mouse' | 'fly'
  geneSymbol: string
  releaseVersion: string
  s3DockerBucketUrl: string
  s3VcfBucketUrl: string
}

async function createVariantViewer({
  chromosome = '19',
  start = 32735000,
  end = 32800000,
  organism = 'mouse',
  geneSymbol = 'PTEN',
  releaseVersion = '8.2.0',
  s3DockerBucketUrl = 'https://s3.amazonaws.com/agrjbrowse/docker',
  s3VcfBucketUrl = 'https://s3.amazonaws.com/agrjbrowse/VCF',
}: VariantViewerArgs) {
  const { container, loading } = createElement(`${organism}-${geneSymbol}-svg`)

  try {
    // Fetch real data from S3
    const region = {
      chromosome,
      start,
      end,
    }

    // Build URLs based on organism and configuration
    let ncListUrl: string
    let vcfUrl: string
    let assembly: string

    if (organism === 'mouse') {
      ncListUrl = `${s3DockerBucketUrl}/${releaseVersion}/MGI/mouse/tracks/All_Genes/${chromosome}/trackData.jsonz`
      vcfUrl = `${s3VcfBucketUrl}/${releaseVersion}/mouse-latest.vcf.gz`
      assembly = 'mouse'
    } else {
      // fly
      ncListUrl = `${s3DockerBucketUrl}/${releaseVersion}/FlyBase/fruitfly/tracks/All_Genes/${chromosome}/trackData.jsonz`
      vcfUrl = `${s3VcfBucketUrl}/${releaseVersion}/fly-latest.vcf.gz`
      assembly = 'fly'
    }

    // Fetch NCList data for gene structure
    const trackData = await fetchNCListData({
      region,
      urlTemplate: ncListUrl,
    })

    // Fetch VCF data for variants
    const variantData = await fetchTabixVcfData({
      url: vcfUrl,
      region,
    })

    // Update loading message
    loading.innerHTML = `Loaded ${variantData.length} variants`

    // Create the viewer with real data

    setTimeout(() => {
      new GenomeFeatureViewer(
        {
          region,
          genome: assembly,
          tracks: [
            {
              type: 'ISOFORM_EMBEDDED_VARIANT',
              trackData,
              variantData,
            },
          ],
          showVariantLabel: false,
          variantFilter: [],
          isoformFilter: [],
          binRatio: 0.01,
        },
        `#${organism}-${geneSymbol}-svg`,
        900,
        500,
      )

      // Add success message
      setTimeout(() => {
        loading.innerHTML = `✓ Loaded ${variantData.length} variants for ${geneSymbol} gene`
        loading.style.color = 'green'
      }, 500)
    }, 100)
  } catch (error) {
    loading.innerHTML = `Error loading data: ${error}`
    loading.style.color = 'red'
    console.error('Failed to load data:', error)
  }

  return container
}

export default {
  title: 'VCF Variant Glyphs Fix',
  render: args => {
    // Create container synchronously
    const wrapper = document.createElement('div')

    // Load data asynchronously
    createVariantViewer(args)
      .then(container => {
        wrapper.append(container)
      })
      .catch((error: unknown) => {
        wrapper.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error}</div>`
      })

    // Return wrapper immediately
    return wrapper
  },
  parameters: {
    docs: {
      description: {
        component: `
# VCF Variant Glyphs Fix - KANBAN-757

This demonstrates the fixes for variant glyph rendering after the Apollo to JBrowse migration.

## What This Shows
- **Real S3 Data**: Fetches actual VCF and NCList data from Alliance S3 buckets
- **Variant Glyphs**: Diamond-shaped glyphs that were completely missing before our fixes
- **Correct Colors**: Consequence-based coloring (yellow for missense, red for high impact)
- **PTEN Gene**: Mouse chromosome 19, positions 32735000-32800000

## The Fixes We Made
1. **Consequence Value Processing**: Strip brackets from values like "[missense_variant]"
2. **Allele ID Parsing**: Handle JSON-wrapped IDs like '["MGI:123"]'
3. **Performance**: Pre-compute variant bins for faster rendering

## How It Works
This story uses the same data pipeline as production:
- NCList data from: \`agrjbrowse/docker/8.2.0/MGI/mouse/tracks/All_Genes/19/trackData.jsonz\`
- VCF data from: \`agrjbrowse/VCF/8.2.0/mouse-latest.vcf.gz\`
        `,
      },
    },
  },
  argTypes: {
    chromosome: {
      control: { type: 'text' },
      description: 'Chromosome to display',
    },
    start: {
      control: { type: 'number' },
      description: 'Start position',
    },
    end: {
      control: { type: 'number' },
      description: 'End position',
    },
    releaseVersion: {
      control: { type: 'text' },
      description: 'Alliance data release version (e.g., 8.2.0)',
    },
    s3DockerBucketUrl: {
      control: { type: 'text' },
      description: 'S3 bucket URL for docker/tracks data',
    },
    s3VcfBucketUrl: {
      control: { type: 'text' },
      description: 'S3 bucket URL for VCF files',
    },
  },
} satisfies Meta<VariantViewerArgs>

type Story = StoryObj<VariantViewerArgs>

// Main PTEN example showing all variants
export const MousePTEN: Story = {
  args: {
    chromosome: '19',
    start: 32735000,
    end: 32800000,
    organism: 'mouse',
    geneSymbol: 'PTEN',
    releaseVersion: '8.2.0',
    s3DockerBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/docker',
    s3VcfBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/VCF',
  },
  parameters: {
    docs: {
      description: {
        story: `
**Mouse PTEN Gene (MGI:109583)**

This loads real variant data from the Alliance S3 bucket for the PTEN gene region.

Expected variants include:
- Missense variants (yellow/gold diamonds)
- Start lost variants (red diamonds)
- UTR variants (modifier impact)

The data is fetched using tabix for efficient region-specific loading.
        `,
      },
    },
  },
}

// Fly Sox14 example
export const FlySox14: Story = {
  args: {
    chromosome: '2R',
    start: 23978801,
    end: 23985177,
    organism: 'fly',
    geneSymbol: 'Sox14',
    releaseVersion: '8.2.0',
    s3DockerBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/docker',
    s3VcfBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/VCF',
  },
  parameters: {
    docs: {
      description: {
        story: `
**Fly Sox14 Gene (FBgn0005612)**

This loads real variant data from the Alliance S3 bucket for the Sox14 gene region in Drosophila.

Sox14 is located on chromosome 2R:23978801-23985177 (6.38 kb) and this demonstrates that our fixes work across different species.

The data is fetched from:
- NCList: FlyBase/fruitfly/tracks/All_Genes/2R/trackData.jsonz  
- VCF: fly-latest.vcf.gz
        `,
      },
    },
  },
}
