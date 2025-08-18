import { VariantFeature } from '../services/VariantService';
import { SimpleFeatureSerialized } from '../services/types';
import * as d3 from 'd3';
export default class IsoformEmbeddedVariantTrack {
    private trackData;
    private variantData;
    private viewer;
    private width;
    private variantFilter;
    private height;
    private transcriptTypes;
    private variantTypes;
    private showVariantLabel;
    private initialHighlight?;
    constructor({ viewer, height, width, transcriptTypes, variantTypes, showVariantLabel, variantFilter, initialHighlight, trackData, variantData, }: {
        viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, undefined>;
        height: number;
        width: number;
        transcriptTypes: string[];
        variantTypes: string[];
        showVariantLabel?: boolean;
        variantFilter: string[];
        initialHighlight?: string[];
        variantData?: VariantFeature[];
        trackData?: SimpleFeatureSerialized[];
    });
    DrawTrack(): number;
    private filterVariantData;
    private renderTooltipDescription;
}
