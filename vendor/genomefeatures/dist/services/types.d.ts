export interface SimpleFeatureSerialized {
    id: string;
    parentId?: string;
    fmin: number;
    fmax: number;
    seqId: string;
    type: string;
    name: string;
    children?: SimpleFeatureSerialized[];
    alleles?: string[];
    selected?: string;
    strand: number;
    source: string;
}
