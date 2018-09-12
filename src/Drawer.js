import IsoformTrack from './tracks/IsoformTrack';
import ReferenceLabel from './tracks/ReferenceLabel';
import VariantTrack from './tracks/VariantTrack';

/*
*   Main Drawing class
*   @Param viewer: the entire viewer
*
*
*  Maybe this should just handle data and thats it.
*/
export default class Drawer {

    constructor(gfc)
    {
        this.gfc = gfc;
        this.used = 0;
    }

    async draw(){
        let locale = this.gfc["locale"];
        let chromosome = this.gfc["config"]["chromosome"];
        let start = this.gfc["config"]["start"];
        let end = this.gfc["config"]["end"];
        let height = this.gfc["height"];
        let width  = this.gfc["width"];
        let viewer = this.gfc["viewer"];
        let tracks = this.gfc["tracks"];

        // Draw our reference if it's local for now.
        // TODO: With a global config we want to create the reference here too.
        console.log("[GCLog] Drawing reference..");
        if(locale == "local"){
           const referenceTrack = new ReferenceLabel(viewer,  {"chromosome": chromosome, "start": start, "end": end}, height, width);
           await referenceTrack.getTrackData();
           referenceTrack.DrawTrack();
        }

        // Always take the start end of our view.
        // TODO: Lock view to always have some number of sequence (50, 100)?
        console.log("[GFCLog] Drawing tracks..");
        tracks.forEach(async function(track) {
            track["start"] = start;
            track["end"] = end;
            if(track.type == "isoform")
            {
                new IsoformTrack(viewer, track, height, width);
            }
            else if(track.type == "variant")
            {
                const variantTrack = new VariantTrack(viewer, track, height, width);
                await variantTrack.getTrackData();
                variantTrack.DrawTrack();
            }
            else
            {
                console.error("TrackType not found for " + track["id"] + "...");
            }
        });
    }
}
