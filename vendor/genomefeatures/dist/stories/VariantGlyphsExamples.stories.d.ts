import { StoryObj } from '@storybook/html';
interface VariantViewerArgs {
    chromosome: string;
    start: number;
    end: number;
    organism: 'mouse' | 'fly';
    geneSymbol: string;
    releaseVersion: string;
    s3DockerBucketUrl: string;
    s3VcfBucketUrl: string;
}
declare const _default: {
    title: string;
    render: (args: VariantViewerArgs) => HTMLDivElement;
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        chromosome: {
            control: {
                type: "text";
            };
            description: string;
        };
        start: {
            control: {
                type: "number";
            };
            description: string;
        };
        end: {
            control: {
                type: "number";
            };
            description: string;
        };
        releaseVersion: {
            control: {
                type: "text";
            };
            description: string;
        };
        s3DockerBucketUrl: {
            control: {
                type: "text";
            };
            description: string;
        };
        s3VcfBucketUrl: {
            control: {
                type: "text";
            };
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<VariantViewerArgs>;
export declare const MousePTEN: Story;
export declare const FlySox14: Story;
