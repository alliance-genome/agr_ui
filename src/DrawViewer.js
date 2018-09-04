import IsoformTrack from './tracks/IsoformTrack';
// TODO:
// Seperate draw label vs tracks
var DrawGenomeView = function(viewer)
{
    console.log("[GFCLog] Drawing tracks..");
    // Loop over our tracks and draw to the svg, if the type isn't found throw an error.
    viewer["tracks"].forEach(track => {
        if(track.type == "isoform")
        {
            new IsoformTrack(viewer["viewer"], track, viewer["width"], viewer["height"]);
        }
        else
        {
            console.error("TrackType not found for " + track["id"] + "...");
        }
    });
}

export default DrawGenomeView;
