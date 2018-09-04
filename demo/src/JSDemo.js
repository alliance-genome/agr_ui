import GenomeFeatureViewer  from "../../src/GenomeFeatureViewer";



//Viewer({chromosome:5, start:28456815, end:28467256, genome:"Mus musculus"},"#viewer2");

let config = {
    "locale": "global",
    "tracks": [
        { 
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

var viewer = new GenomeFeatureViewer(config, "#viewer", 500, 960);
