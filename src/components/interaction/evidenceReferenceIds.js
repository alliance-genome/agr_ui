// The interactions endpoints carry their publications in `evidence[]`, where each entry's
// `referenceID` (a PMID or MOD reference) is also one of its own `crossReferences`. Pull those
// cross references out so the whole array can go through ReferencesCellCuration, which is what
// the other tables use for their Reference ID column.
export default function evidenceReferenceIds(evidence) {
  if (!evidence || !evidence.length) return [];

  return evidence
    .map((entry) => {
      const referencedCurie = entry?.referenceID;
      if (!referencedCurie) return null;
      const crossReference = entry.crossReferences?.find((xref) => xref.referencedCurie === referencedCurie);
      // without a matching cross reference there is no url template, so render the id unlinked
      return crossReference || { referencedCurie };
    })
    .filter(Boolean);
}
