import { VariantBin } from './VariantService';
import * as d3 from 'd3';
export declare class VariantPositionManager {
    private placedVariants;
    private readonly MAX_VARIANT_ROWS;
    private readonly bufferConfig;
    getVariantRow(variant: VariantBin, x: d3.ScaleLinear<number, number>): number;
    private normalizeVariantType;
    private findAvailableRow;
    addPlacedVariant(variant: VariantBin, row: number, x: d3.ScaleLinear<number, number>): void;
    getMaxRow(): number;
    isOverflowRow(row: number): boolean;
    reset(): void;
}
