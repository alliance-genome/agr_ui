import { VariantFeature } from './services/VariantService';
import { Region } from './types';
export declare function fetchTabixVcfData({ url, indexUrl, indexType, region, }: {
    url: string;
    indexUrl?: string;
    indexType?: string;
    region: Region;
}): Promise<VariantFeature[]>;
