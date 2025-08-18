import { Region } from '../types';
import { Selection } from 'd3';
export default class VariantTrack {
    private variants;
    private viewer;
    private width;
    private height;
    private region;
    private range;
    constructor({ region, viewer, height, width, range, }: {
        viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>;
        height: number;
        width: number;
        region: Region;
        range: [number, number];
    });
    DrawTrack(): void;
    getTrackData(): Promise<void>;
}
