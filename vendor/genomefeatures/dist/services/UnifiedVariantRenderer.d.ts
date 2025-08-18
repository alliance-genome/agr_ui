import { VariantFeature } from './VariantService';
import * as d3 from 'd3';
export declare class UnifiedVariantRenderer {
    private readonly VARIANT_HEIGHT;
    private readonly ROW_SPACING;
    private readonly SECTION_PADDING;
    renderAllVariants(viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>, variantData: VariantFeature[], width: number, x: d3.ScaleLinear<number, number>, showVariantLabel: boolean, tooltipDiv: d3.Selection<HTMLDivElement, unknown, HTMLElement | null, any>, closeToolTip: () => void, renderTooltipDescription: (tooltipDiv: d3.Selection<HTMLDivElement, unknown, HTMLElement | null, any>, descriptionHtml: string, closeFunction: () => void, event: MouseEvent) => void): number;
    private consolidateVariants;
    private renderVariantByType;
}
