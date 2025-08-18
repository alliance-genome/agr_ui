import { Selection } from 'd3';
interface Track {
    start: number;
    end: number;
    chromosome: string;
    range: [number, number];
}
interface ReferenceTrackProps {
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>;
    track: Track;
    height: number;
    width: number;
}
export default class ReferenceTrack {
    private refSeq;
    private viewer;
    private width;
    private height;
    private track;
    constructor({ viewer, track, height, width }: ReferenceTrackProps);
    DrawScrollableTrack(): void;
    DrawOverviewTrack(): void;
    private _getRefTick;
    getTrackData(): Promise<void>;
}
export {};
