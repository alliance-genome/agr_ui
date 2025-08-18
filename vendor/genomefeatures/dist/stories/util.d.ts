import { TrackType } from '../tracks/TrackTypeEnum';
export declare function createElement(id: string): HTMLDivElement;
export interface StaticArgs {
    locString: string;
    genome: string;
    divId?: string;
    type: TrackType;
    showVariantLabel?: boolean;
    variantFilter?: string[];
    isoformFilter?: string[];
    initialHighlight?: string[];
    showVariants?: boolean;
    vcfTabixUrl?: string;
    ncListUrlTemplate: string;
}
export declare function createExampleStatic({ locString, genome, divId, type, showVariantLabel, variantFilter, isoformFilter, ncListUrlTemplate, vcfTabixUrl, }: StaticArgs): HTMLDivElement;
export interface ApolloArgs {
    locString: string;
    genome: string;
    divId?: string;
    type: TrackType;
    trackName?: string;
    showVariantLabel?: boolean;
    variantFilter?: string[];
    isoformFilter?: string[];
    initialHighlight?: string[];
    showVariants?: boolean;
}
export declare function createExampleApollo({ locString, genome, divId, type, trackName, showVariantLabel, variantFilter, isoformFilter, showVariants, }: {
    locString: string;
    genome: string;
    divId: string;
    type: TrackType;
    trackName?: string;
    showVariantLabel?: boolean;
    variantFilter?: string[];
    isoformFilter?: string[];
    initialHighlight?: string[];
    showVariants?: boolean;
}): HTMLDivElement;
