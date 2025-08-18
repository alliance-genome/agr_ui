import { default as VCF } from '@gmod/vcf';
export declare function getSOTermAndDescription(ref: string, alt: string[] | undefined, parser: VCF): string[];
export declare function getSOAndDescFromAltDefs(alt: string, parser: VCF): string[];
export declare function getSOAndDescByExamination(ref: string, alt: string): string[];
