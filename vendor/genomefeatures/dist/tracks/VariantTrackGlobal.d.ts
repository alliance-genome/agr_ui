import { Region } from '../types';
import { Selection } from 'd3';
interface Track {
    range: [number, number];
}
export default class VariantTrackGlobal {
    private variants;
    private viewer;
    private width;
    private height;
    private track;
    private region;
    constructor({ viewer, track, height, width, region, }: {
        viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>;
        track: Track;
        height: number;
        width: number;
        region: Region;
    });
    DrawTrack(): void;
    getTrackData(): Promise<void>;
}
export {};
