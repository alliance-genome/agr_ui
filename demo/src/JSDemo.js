import GenomeFeatureViewer  from "../../src/GenomeFeatureViewer";
import { ApolloService } from '../../src/services/services';


// Local View Example 
// Right now we enter in with a specific location, center it in the viewer.
// TODO: Enable a range and start the left most value on the viewer.
let configLocal = {
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
} 


var viewer2 = new GenomeFeatureViewer(configLocal, "#viewer2", 500, 960)


/*Global View Example


let configGlobal = {
    "locale": "global",
    "chromosome": 5,
    "start": 75574916, 
    "end": 75656722, 
    "tracks": [
        { 
            "id": 1,
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

var viewer = new GenomeFeatureViewer(configGlobal, "#viewer", 500, 960);*/
