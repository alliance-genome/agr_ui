//import {GenerateGenomeView} from "../../src/GenomeFeature.js";
var GenerateGenomeView = require('../../src/GenomeFeature');
//import '../../src/App.css';


var options1 = {
    chromosome: 5,
    start: 28456815,
    end: 28467256,
    genome: "Mus musculus",
    // highlightNames: ['Shh']
};
var options2 = {
    chromosome: 5,
    start: 75574916,
    end: 75656722,
    genome: "Mus musculus",
    highlightNames: ['Kit']
};

GenerateGenomeView("#viewer2", options1);

GenerateGenomeView("#viewer", options2);

