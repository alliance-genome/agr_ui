import GenomeFeatureViewer from 'GenomeFeatureViewer';
import {TRACK_TYPE} from "../tracks/TrackTypeEnum";

// const BASE_URL = 'http://localhost:8080/apollo';
// const BASE_URL = 'http://54.91.83.120:8080/apollo';
const BASE_URL = 'https://agr-apollo.berkeleybop.io/apollo';

// Global View Example

oldExamples();
wormExamples();
fishExamples();
ratExamples();
mouseExamples();
flyExamples();


function createEmbeddedExample(range,genome,divId,showLabel,variantFilter){
  const chromosome = range.split(":")[0];
  const [start,end] = range.split(":")[1].split("..");
  let configGlobal1 = {
    "locale": "global",
    "chromosome": chromosome,
    "start": start,
    "end": end,
    "showVariantLabel": showLabel,
    "variantFilter": variantFilter ? variantFilter : [],
    "tracks": [
      {
        "id": 12,
        "genome": genome,
        "type": TRACK_TYPE.ISOFORM_AND_VARIANT,
        "isoform_url": [
          `${BASE_URL}/track/`,
          "/All%20Genes/",
          ".json"
        ],
        "variant_url": [
          `${BASE_URL}/vcf/`,
          "/Variants/",
          ".json"
        ],

      },
    ]
  };
    new GenomeFeatureViewer(configGlobal1, `#${divId}`, 900, 500);
}

function flyExamples(){
  // 2L:132412..230018
// http://localhost:8080/apollo/vcf/remotefly/Phenotypic%20Variants/2L:132412..230018.json?includeGenotypes=false&ignoreCache=true
// http://localhost:8080/apollo/track/remotefly/All%20Genes/2L:132412..230018.json?includeGenotypes=false&ignoreCache=true
  createEmbeddedExample("2L:130639..135911","fly","viewerFlyExample1",true);
  createEmbeddedExample("2R:23974973..23989002","fly","viewerFlyExample3",true,['NT_033778.4:g.23975146T>C']);
  createEmbeddedExample("2R:23974973..23989002","fly","viewerFlyExample2",true);
  createEmbeddedExample("2L:130639..135911","fly","viewerFlyExample1NoLabel",false);
  createEmbeddedExample("2R:23974973..23989002","fly","viewerFlyExample3NoLabel",false,['NT_033778.4:g.23975146T>C']);
  createEmbeddedExample("2R:23974973..23989002","fly","viewerFlyExample2NoLabel",false);
}

function ratExamples(){
  // http://localhost:8080/apollo/vcf/remotemouse/Phenotypic%20Variants/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true
  // http://localhost:8080/apollo/track/remotemouse/All%20Genes/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true  let configGlobal1 = {
  createEmbeddedExample("10:94485648..94489071","rat","networkExampleRat1",false,null);
  createEmbeddedExample("1:34987290..35280466","rat","viewerRatExample1",true);
  createEmbeddedExample("1:34987290..35280466","rat","viewerRatExample1NoLabel",false);
}
function mouseExamples(){
  // http://localhost:8080/apollo/vcf/remotemouse/Phenotypic%20Variants/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true
  // http://localhost:8080/apollo/track/remotemouse/All%20Genes/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true  let configGlobal1 = {
  createEmbeddedExample("6:113619452..113636198","mouse","viewerMouseExample1",true);
  createEmbeddedExample("6:113619452..113636198","mouse","viewerMouseExample1NoLabel",false);
}

function fishExamples(){
  createEmbeddedExample("14:5383966..5390885","zebrafish","viewerFishLbx2",true);
  createEmbeddedExample("8:40452405..40469627","zebrafish","viewerFishMyl7",true);
  createEmbeddedExample("14:5383966..5390885","zebrafish","viewerFishLbx2NoLabel",false);
  createEmbeddedExample("8:40452405..40469627","zebrafish","viewerFishMyl7NoLabel",false);
}


function wormExamples(){
  createEmbeddedExample("V:7106..57424","worm","viewerWormEgl8",true);
  createEmbeddedExample("V:7106..57424","worm","viewerWormEgl8NoLabel",false);
  createEmbeddedExample("V:7114..57432","worm","networkExampleWorm1",false,null);
}




function oldExamples(){

  let configGlobal1 = {
    "locale": "global",
    "chromosome": 5,
    "start": 75574916,
    "end": 75656722,
    "tracks": [
      {
        id:2,
        "genome":"Mus musculus",
        "type": "variant-global",
      },
      {
        "id": 1,
        "genome":"Mus musculus",
        "type": TRACK_TYPE.ISOFORM,
        "url": [
          "https://agr-apollo.berkeleybop.io/apollo/track/",
          "/All%20Genes/",
          ".json"
        ]
      },
    ]
  };

  new GenomeFeatureViewer(configGlobal1, "#viewer1", 700, null);

  let configGlobal2 = {
    "locale": "global",
    "chromosome": "2L",
    "start": 19400752,
    "end": 19426596,
    "transcriptTypes":  [
      'mRNA', 'ncRNA', 'piRNA'
      , 'lincRNA'
      , 'miRNA'
      , 'pre_miRNA'
      , 'snoRNA'
      , 'lnc_RNA'
      , 'tRNA'
      , 'snRNA'
      , 'rRNA'
      , 'ARS'
      , 'antisense_RNA'


      , 'C_gene_segment'
      , 'V_gene_segment'
      , 'pseudogene_attribute'
      ,'snoRNA_gene'
    ],
    "tracks": [
      {
        "id": 1,
        "genome":"Drosophila melanogaster",
        "type": TRACK_TYPE.ISOFORM,
        "url": [
          "https://agr-apollo.berkeleybop.io/apollo/track/",
          "/All%20Genes/",
          ".json?name=Pax"
        ]
      },
    ]
  };

  new GenomeFeatureViewer(configGlobal2, "#viewer2", 700, null);

// Local View Example
// Right now we enter in with a specific location, center it in the viewer.
// TODO: Enable a range and start the left most value on the viewer.
  let configLocal3 = {
    "locale": "local",
    "chromosome": 5,
    "start": 48515461,
    "end": 48515461,
    "centerVariant": true,
    "tracks": [
      {
        "id": 1,
        "label": "Case Variants",
        "type": "variant",
        "chromosome": 5,
      },
      {
        "id": 2,
        "label": "ClinVar Cases",
        "type": "variant",
        "chromosome": 5,
      }
    ]
  };


  new GenomeFeatureViewer(configLocal3, "#viewer3", 900, 400);

}
