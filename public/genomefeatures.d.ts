import { VariantFeature } from './services/VariantService';
import { SimpleFeatureSerialized } from './services/types';
import { Region } from './types';
import * as d3 from 'd3';
interface Track {
    type: string;
    label?: string;
    variantData?: VariantFeature[];
    trackData?: SimpleFeatureSerialized[];
}
interface ViewerConfig {
    tracks?: Track[];
    region: Region;
    genome: string;
    showVariantLabel?: boolean;
    transcriptTypes?: string[];
    variantTypes?: string[];
    isoformFilter?: string[];
    variantFilter?: string[];
    htpVariant?: string;
    binRatio?: number;
}
declare module 'd3' {
    interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
        first(): Selection<GElement, Datum, PElement, PDatum>;
        last(): Selection<GElement, Datum, PElement, PDatum>;
    }
}
export declare class GenomeFeatureViewer {
    config: ViewerConfig;
    height: number;
    width: number;
    svg_target: string;
    viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>;
    constructor(config: ViewerConfig, svg_target: string, width: number, height: number);
    generateLegend(): string;
    get tracks(): Track[];
    get genome(): string;
    closeModal(): void;
    setSelectedAlleles(selectedAlleles: string[], target: string): void;
    private _initViewer;
    getTracks(defaultTrack?: boolean): Track | Track[];
    draw(): void;
    _configureRange(start: number, end: number, width: number): {
        start: number;
        end: number;
        range: [number, number];
    };
}
export { fetchNCListData } from './NCListFetcher';
export { fetchApolloAPIData } from './ApolloAPIFetcher';
export { fetchTabixVcfData } from './GMODVcfFetcher';
export { parseLocString } from './util';
