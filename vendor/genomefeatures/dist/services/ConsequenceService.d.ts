export declare const CONSEQUENCES_ENUM: {
    readonly transcript_ablation: {
        readonly impact: "HIGH";
        readonly color: "#ff0000";
    };
    readonly splice_acceptor_variant: {
        readonly impact: "HIGH";
        readonly color: "#ff581a";
    };
    readonly splice_donor_variant: {
        readonly impact: "HIGH";
        readonly color: "#ff581a";
    };
    readonly stop_gained: {
        readonly impact: "HIGH";
        readonly color: "#ff0000";
    };
    readonly frameshift_variant: {
        readonly impact: "HIGH";
        readonly color: "#9400D3";
    };
    readonly stop_lost: {
        readonly impact: "HIGH";
        readonly color: "#ff0000";
    };
    readonly start_lost: {
        readonly impact: "HIGH";
        readonly color: "#ffd700";
    };
    readonly transcript_amplification: {
        readonly impact: "HIGH";
        readonly color: "#ff69b4";
    };
    readonly inframe_insertion: {
        readonly impact: "MODERATE";
        readonly color: "#ff69b4";
    };
    readonly inframe_deletion: {
        readonly impact: "MODERATE";
        readonly color: "#ff69b4";
    };
    readonly missense_variant: {
        readonly impact: "MODERATE";
        readonly color: "#ffd700";
    };
    readonly protein_altering_variant: {
        readonly impact: "MODERATE";
        readonly color: "#ff0080";
    };
    readonly splice_region_variant: {
        readonly impact: "LOW";
        readonly color: "#ff7f50";
    };
    readonly incomplete_terminal_codon_variant: {
        readonly impact: "LOW";
        readonly color: "#ff00ff";
    };
    readonly start_retained_variant: {
        readonly impact: "LOW";
        readonly color: "#76ee00";
    };
    readonly stop_retained_variant: {
        readonly impact: "LOW";
        readonly color: "#76ee00";
    };
    readonly synonymous_variant: {
        readonly impact: "LOW";
        readonly color: "#76ee00";
    };
    readonly coding_sequence_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#458b00";
    };
    readonly mature_miRNA_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#458b00";
    };
    readonly five_prime_UTR_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#7ac5cd";
    };
    readonly three_prime_UTR_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#7ac5cd";
    };
    readonly non_coding_transcript_exon_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#32cd32";
    };
    readonly intron_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#02599c";
    };
    readonly NMD_transcript_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#ff4500";
    };
    readonly non_coding_transcript_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#32cd32";
    };
    readonly upstream_gene_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#a2b5cd";
    };
    readonly downstream_gene_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#a2b5cd";
    };
    readonly TFBS_ablation: {
        readonly impact: "MODIFIER";
        readonly color: "#a52a2a";
    };
    readonly TFBS_amplification: {
        readonly impact: "MODIFIER";
        readonly color: "#a52a2a";
    };
    readonly TF_binding_site_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#a52a2a";
    };
    readonly regulatory_region_ablation: {
        readonly impact: "MODERATE";
        readonly color: "#a52a2a";
    };
    readonly regulatory_region_amplification: {
        readonly impact: "MODIFIER";
        readonly color: "#a52a2a";
    };
    readonly feature_elongation: {
        readonly impact: "MODIFIER";
        readonly color: "#7f7f7f";
    };
    readonly regulatory_region_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#a52a2a";
    };
    readonly feature_truncation: {
        readonly impact: "MODIFIER";
        readonly color: "#7f7f7f";
    };
    readonly intergenic_variant: {
        readonly impact: "MODIFIER";
        readonly color: "#636363";
    };
};
export declare function getColorForConsequence(consequence: string): "black" | "#ff0000" | "#ff581a" | "#9400D3" | "#ffd700" | "#ff69b4" | "#ff0080" | "#ff7f50" | "#ff00ff" | "#76ee00" | "#458b00" | "#7ac5cd" | "#32cd32" | "#02599c" | "#ff4500" | "#a2b5cd" | "#a52a2a" | "#7f7f7f" | "#636363" | "gray" | "#f0f";
