import EvidenceCodeCuration from "./EvidenceCodeCuration";

const EvidenceCodeViaOrthologyCuration = () => {
  const evidenceCode = {
    abbreviation: "IEA",
    name: "evidence used in automatic assertion",
    curie: "ECO:0000501"
  };

  return (
    <EvidenceCodeCuration code={evidenceCode} />
  );
};

export default EvidenceCodeViaOrthologyCuration;