import { SimpleFeatureSerialized } from '../services/types';
import { Region } from '../types';
import { Selection } from 'd3';
export default class IsoformTrack {
    private trackData;
    private viewer;
    private width;
    private height;
    private transcriptTypes;
    private htpVariant?;
    private region;
    private genome;
    constructor({ viewer, height, width, transcriptTypes, htpVariant, trackData, region, genome, }: {
        viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>;
        height: number;
        width: number;
        transcriptTypes: string[];
        htpVariant?: string;
        trackData?: SimpleFeatureSerialized[];
        region: Region;
        genome: string;
    });
    private renderTooltipDescription;
    DrawTrack(): number;
}
