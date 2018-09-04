import IsoformTrack from './tracks/IsoformTrack';
// TODO:
// if we seperate out the top "global" label
var DrawGenomeView = function(viewer){
    console.log("Finding tracks...")
    // Loop over our tracks and draw to the svg
    viewer["tracks"].forEach(track => {
        if(track.type == "isoform"){
            new IsoformTrack(viewer["viewer"], track, viewer["width"], viewer["height"]);
        }
    });
}

export default DrawGenomeView;
