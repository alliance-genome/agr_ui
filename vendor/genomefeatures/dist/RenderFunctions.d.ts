import { SimpleFeatureSerialized } from './services/types';
import * as d3 from 'd3-selection';
export declare function checkSpace(used_space: string[][], start: number, end: number): number;
export declare function findRange(data: SimpleFeatureSerialized[], display_feats: unknown[]): {
    fmin: number;
    fmax: number;
};
export declare function calculateNewTrackPosition(viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>): number;
export declare function getTranslate(transform: string): [number, number];
export declare function setHighlights(selectedAlleles: string[], svgTarget: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>): void;
