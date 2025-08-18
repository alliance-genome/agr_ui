import { Region } from './types';
export declare function isGzip(buf: Uint8Array): boolean;
export declare function fetchNCListData({ urlTemplate, baseUrl, region, }: {
    urlTemplate: string;
    baseUrl?: string;
    region: Region;
}): Promise<import('./services/types').SimpleFeatureSerialized[]>;
