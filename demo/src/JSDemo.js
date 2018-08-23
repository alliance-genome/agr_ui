import GenomeFeatureViewer from "../../src/GenomeFeatureViewer";


var options1 = {
    chromosome: 5,
    start: 28456815,
    end: 28467256,
    genome: "Mus musculus",
    // highlightNames: ['Shh']
};

GenomeFeatureViewer(options1,"#viewer2");


var options2 = {
    chromosome: 5,
    start: 75574916,
    end: 75656722,
    genome: "Mus musculus",
    highlightNames: ['Kit']
};

GenomeFeatureViewer(options2, "#viewer");
