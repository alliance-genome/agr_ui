import { SimpleFeatureSerialized } from './services/types';
export default class NCListFeature {
    private ncFeature;
    private parentHandle?;
    private uniqueId;
    constructor(ncFeature: any, parent?: NCListFeature, id?: string);
    jb2TagToJb1Tag(tag: string): string;
    jb1TagToJb2Tag(tag: string): string;
    get(attrName: string): any;
    tags(): string[];
    id(): string;
    parent(): NCListFeature | undefined;
    children(): any;
    toJSON(): SimpleFeatureSerialized;
}
