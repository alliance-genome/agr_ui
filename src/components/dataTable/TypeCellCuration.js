const TypeCellCuration = ({ subject }) => {
  if (subject.type === 'AffectedGenomicModel') {
    const subtype = subject?.subtype?.name || '';
    const capitalizedSubtype = `${subtype.charAt(0).toUpperCase()}${subtype.slice(1)}`;

    return capitalizedSubtype || '';
  } else {
    return subject.type || '';
  }
};

export default TypeCellCuration;
