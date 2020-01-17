import GenomeFeatureViewer from 'GenomeFeatureViewer';
import {FakeAgrDataService} from "./FakeAgrDataService";

// import {ApolloService} from "../services/ApolloService";
// let apolloService = new ApolloService();

// Global View Example
let fakeAgrDataService = new FakeAgrDataService();

oldExamples();
wormExamples();
fishExamples();
ratExamples();
mouseExamples();
flyExamples();

function createExample(isoformDataFunction,variantDataFunction,divId,showLabel,variantFilter){
  let configGlobal1 = {
    "locale": "global",
    "chromosome": '2L',
    "start": 132412,
    "end": 230018,
    "showVariantLabel":showLabel ,
    "variantFilter":variantFilter ? variantFilter : [],
    "tracks": [
      {
        "id": 12,
        "genome":"Fly",
        "type": "isoform_variant",
        "isoformFunction": isoformDataFunction,
        "isoform_url": [
          "https://agr-apollo.berkeleybop.io/apollo/track/",
          "/All%20Genes/",
          ".json"
        ],
        "variantFunction": variantDataFunction,
        "variant_url": [
          "https://agr-apollo.berkeleybop.io/apollo/vcf/",
          "/Phenotypic%20Variants/",
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
  createExample(fakeAgrDataService.GetFakeFlyGeneExample1(),fakeAgrDataService.GetFakeFlyVariantExample1(),"viewerFlyExample1",true);
  createExample(fakeAgrDataService.GetFakeFlyGeneExample2(),fakeAgrDataService.GetFakeFlyVariantExample2(),"viewerFlyExample3",true,['NT_033778.4:g.23975146T>C']);
  createExample(fakeAgrDataService.GetFakeFlyGeneExample2(),fakeAgrDataService.GetFakeFlyVariantExample2(),"viewerFlyExample2",true);
  createExample(fakeAgrDataService.GetFakeFlyGeneExample1(),fakeAgrDataService.GetFakeFlyVariantExample1(),"viewerFlyExample1NoLabel",false);
  createExample(fakeAgrDataService.GetFakeFlyGeneExample2(),fakeAgrDataService.GetFakeFlyVariantExample2(),"viewerFlyExample3NoLabel",false,['NT_033778.4:g.23975146T>C']);
  createExample(fakeAgrDataService.GetFakeFlyGeneExample2(),fakeAgrDataService.GetFakeFlyVariantExample2(),"viewerFlyExample2NoLabel",false);
}

function ratExamples(){
  // http://localhost:8080/apollo/vcf/remotemouse/Phenotypic%20Variants/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true
  // http://localhost:8080/apollo/track/remotemouse/All%20Genes/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true  let configGlobal1 = {
  createExample(fakeAgrDataService.GetFakeRatGeneExample1(),fakeAgrDataService.GetFakeRatVariantExample1(),"viewerRatExample1",true);
  createExample(fakeAgrDataService.GetFakeRatGeneExample1(),fakeAgrDataService.GetFakeRatVariantExample1(),"viewerRatExample1NoLabel",false);
}
function mouseExamples(){
  // http://localhost:8080/apollo/vcf/remotemouse/Phenotypic%20Variants/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true
  // http://localhost:8080/apollo/track/remotemouse/All%20Genes/6:113619452..113636198.json?includeGenotypes=false&ignoreCache=true  let configGlobal1 = {
  createExample(fakeAgrDataService.GetFakeMouseGeneExample1(),fakeAgrDataService.GetFakeMouseVariantExample1(),"viewerMouseExample1",true);
  createExample(fakeAgrDataService.GetFakeMouseGeneExample1(),fakeAgrDataService.GetFakeMouseVariantExample1(),"viewerMouseExample1NoLabel",false);
}

function fishExamples(){
  createExample(fakeAgrDataService.GetFakeFishGeneDataLbx2(),fakeAgrDataService.GetFakeFishVariantDataLbx2(),"viewerFishLbx2",true);
  createExample(fakeAgrDataService.GetFakeFishGeneDataMyl7(),fakeAgrDataService.GetFakeFishVariantDataMyl7(),"viewerFishMyl7",true);
  createExample(fakeAgrDataService.GetFakeFishGeneDataLbx2(),fakeAgrDataService.GetFakeFishVariantDataLbx2(),"viewerFishLbx2NoLabel",false);
  createExample(fakeAgrDataService.GetFakeFishGeneDataMyl7(),fakeAgrDataService.GetFakeFishVariantDataMyl7(),"viewerFishMyl7NoLabel",false);
}


function wormExamples(){
  createExample(fakeAgrDataService.GetFakeWormGeneDataEgl8(),fakeAgrDataService.GetFakeWormVariantDataEgl8(),"viewerWormEgl8",true);
  createExample(fakeAgrDataService.GetFakeWormGeneDataEgl8(),fakeAgrDataService.GetFakeWormVariantDataEgl8(),"viewerWormEgl8NoLabel",false);
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
        "type": "isoform",
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
        "type": "isoform",
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
