const IEA = 'IEA';

function getAssocationEvidenceCode(association) {
  return (association.annotations || []).reduce((associationEvidenceCodes, annotation) => {
    return associationEvidenceCodes.concat(
      (annotation.publications || []).reduce(
        (annotationEvidenceCodes, publication) => {
          return annotationEvidenceCodes.concat(publication.evidenceCodes || []);
        },
        []
      )
    );
  }, []);
}

function getDiseaseAssociationViaOrthology(associations) {
  return (associations || []).filter((association) => {
    const evidenceCodes = new Set(getAssocationEvidenceCode(association));
    return evidenceCodes.has(IEA);
  });
}

function getDiseaseAssociationViaExperiment(associations) {
  return (associations || []).filter((allInferredAssociations, association) => {
    const evidenceCodes = new Set(getAssocationEvidenceCode(association));
    return evidenceCodes.size !== 0 && !evidenceCodes.has(IEA);
  });
}

export {
  getDiseaseAssociationViaOrthology,
  getDiseaseAssociationViaExperiment,
};
