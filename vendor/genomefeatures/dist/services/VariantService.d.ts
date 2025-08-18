import { SimpleFeatureSerialized } from './types';
export declare function generateSnvPoints(x: number): string;
export declare function generateInsertionPoint(x: number): string;
interface Feat {
    fmin: number;
    fmax: number;
    row: number;
}
export declare function getDeletionHeight(x: Feat[], fmin: number, fmax: number): number;
export declare function generateDelinsPoint(x: number): string;
export declare function getDescriptionDimensions(description: VariantDescription): {
    descriptionWidth: number;
    descriptionHeight: number;
};
export type VariantFeature = SimpleFeatureSerialized & VariantBin;
export interface VariantBin {
    seqId: string;
    name: string;
    fmin: number;
    fmax: number;
    type: string;
    reference_allele: string;
    alternative_alleles?: {
        values: string[];
    };
    impact?: {
        values: string[];
    };
    description: string;
    symbol?: {
        values: string[];
    };
    symbol_text?: {
        values: string[];
    };
    consequence: string;
    variantSet: VariantBin[];
    variants: VariantBin[];
    allele_of_genes?: {
        values: string[];
    };
    allele_of_gene_symbols?: {
        values: string[];
    };
    allele_of_gene_ids?: {
        values: string[];
    };
    allele_symbols_text?: {
        values: string[];
    };
    allele_symbols?: {
        values: string[];
    };
    allele_ids?: {
        values: string[];
    };
    geneLevelConsequence?: {
        values: string[];
    };
}
export declare function generateVariantBins(variantData: VariantFeature[]): VariantBin[];
export declare function generateVariantDataBinsAndDataSets(variantData: VariantFeature[], ratio: number): VariantBin[];
export declare function renderVariantDescriptions(descriptions: VariantDescription[]): string;
export declare function renderVariantDescription(description: VariantDescription): string;
export declare function getVariantDescriptions(variant: VariantBin): {
    consequence: string;
    symbol: string;
    symbolDetail: string | undefined;
    location: string;
    type: string;
    name: string;
    description: string;
    reference_allele: string;
    geneId: string | undefined;
    geneSymbol: string | undefined;
    allele_of_genes: string;
    allele_ids: string;
    alternative_alleles: string;
    impact: string;
}[];
export declare function getVariantAlleles(variant: VariantBin): string[];
export declare function getColorsForConsequences(descriptions: {
    consequence: string;
}[]): ("black" | "#ff0000" | "#ff581a" | "#9400D3" | "#ffd700" | "#ff69b4" | "#ff0080" | "#ff7f50" | "#ff00ff" | "#76ee00" | "#458b00" | "#7ac5cd" | "#32cd32" | "#02599c" | "#ff4500" | "#a2b5cd" | "#a52a2a" | "#7f7f7f" | "#636363" | "gray" | "#f0f")[];
export declare function getConsequence(variant: VariantBin): string;
type VariantDescription = ReturnType<typeof getVariantDescription>;
export declare function getVariantDescription(variant: VariantBin): {
    symbol: string;
    symbolDetail: string | undefined;
    location: string;
    consequence: string;
    type: string;
    name: string;
    description: string;
    reference_allele: string;
    geneId: string | undefined;
    geneSymbol: string | undefined;
    allele_of_genes: string;
    allele_ids: string;
    alternative_alleles: string;
    impact: string;
};
export declare function getVariantSymbolDetail(variant: VariantBin): string | undefined;
export declare function getVariantSymbol(variant: VariantBin): string;
export declare function getVariantTrackPositions(variantData: VariantFeature[]): string[];
export {};
