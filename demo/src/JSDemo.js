import GenomeFeatureViewer  from "../../src/GenomeFeatureViewer";
import { ApolloService } from '../../src/services/services';


/* Lcoal View Example */
let configLocal = {
    "locale": "local",
    "chromosome": 5,
    "start": 48515448,
    "end": 48515548,
    "tracks": [
        {
            "id": 1,
            "label": "Case Variants",
            "type": "variant",
            "chromosome": 5,
        },
        {
            "id": 2,
            "label": "Case Variants",
            "type": "variant",
            "chromosome": 5,
        }
    ]
}
var viewer2 = new GenomeFeatureViewer(configLocal, "#viewer2", 500, 960)


/*
{
            "id": 1,
            "type": "isoform",
            "chromosome": 5,
            "start": 28456815,
            "end": 28467256,
            "genome": "Mus musculus",
            "url": [
                "https://agr-apollo.berkeleybop.io/apollo/track/",
                "/All%20Genes/",
                ".json"    
            ]
        }


Global View Example

    let configGlobal = {
    "locale": "global",
    "tracks": [
        { 
            "id": 1,
            "chromosome": 5,
            "start": 75574916, 
            "end": 75656722, 
            "genome":"Mus musculus",
            "type": "isoform",
            "url": [
                "https://agr-apollo.berkeleybop.io/apollo/track/",
                "/All%20Genes/",
                ".json"    
            ]
        }
    ]
};

var viewer = new GenomeFeatureViewer(configGlobal, "#viewer", 500, 960); */
