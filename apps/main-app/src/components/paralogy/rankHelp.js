export default function RankHelp() {
    return (
    <div>
      <p>
        The ranking score is calculated using a weighted formula:
        Score = w₁ x (Alignment Length x Similarity %) + w₂ x (Alignment Length x Identity %) + w₃ x (Method Count) + w₄ x (Alignment Length).
      </p>
      <p>
        Where the weights are as follows:
      </p>  
      <ul>
        <li>w₁ = 1.000: Weight for the absolute number of similar amino acids.</li>
        <li>w₂ = 1.000: Weight for the absolute number of identical amino acids.</li>
        <li>w₃ = 1.500: Weight for the method count.</li>
        <li>w₄ = 1.500: Weight for the alignment length.</li>
      </ul>
      <p>
        Multiple entries can share the same rank.
      </p>
    </div>);
  }
