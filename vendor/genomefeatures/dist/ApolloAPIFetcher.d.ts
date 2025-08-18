export declare function fetchApolloAPIData({ region, baseUrl, genome, track, extra, }: {
    region: {
        chromosome: string;
        start: number;
        end: number;
    };
    genome: string;
    baseUrl: string;
    track: string;
    extra?: string;
}): Promise<any>;
