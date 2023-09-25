export default function RankHelp() {
    return (
    <div>
      <p>
        The ranking score is calculated using a weighted formula:
        Score = w₁ x (Alignment Length x Similarity %) + w₂ x (Alignment Length x Identity %) + w₃ x (Method Count) + w₄ x (Alignment Length).
      </p>
      <p>
        Where the weights are as follows:
        - w₁ = 1.000: Weight for the absolute number of similar amino acids.
        - w₂ = 1.000: Weight for the absolute number of identical amino acids.
        - w₃ = 1.500: Weight for the method count.
        - w₄ = 1.500: Weight for the alignment length.
      </p>
      <p>
        Multiple entries can share the same rank.
      </p>
    </div>);
  }