import { default as VCFParser, Variant } from '@gmod/vcf';
export default class VCFFeature {
    private variant;
    private parser;
    private data;
    private _id;
    constructor(args: {
        variant: Variant;
        parser: VCFParser;
        id: string;
    });
    get(field: string): any;
    parent(): undefined;
    children(): undefined;
    id(): string;
    toJSON(): {
        samples: Record<string, Record<string, (string | number | undefined)[] | undefined>>;
        refName: string | undefined;
        start: number;
        end: number;
        description: string;
        type: string;
        name: string | undefined;
        aliases: string[] | undefined;
        CHROM: string | undefined;
        POS: number;
        ALT: string[] | undefined;
        INFO: any;
        REF: string | undefined;
        FILTER: string | string[] | undefined;
        ID: string[] | undefined;
        QUAL: number | undefined;
        FORMAT: string | undefined;
        uniqueId: string;
    };
}
