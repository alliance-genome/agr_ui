
const TypeCellCuration = ({ subject }) => {

  if (subject.type === "AffectedGenomicModel") {
    const [prefix] = subject.curie.split(':');

    subject.subtype = {};
		if(prefix === "MGI") subject.subtype.name = "Genotype";
		if(prefix === "ZFIN") subject.subtype.name = "Fish";
		if(prefix === "WB") {
			if(subject.curie.toLowerCase().includes("genotype")) subject.subtype.name = "Genotype";
			if(subject.curie.toLowerCase().includes("strain")) subject.subtype.name = "Strain";
		}
		if(prefix === "RGD") subject.subtype.name = "Strain";
    
    return subject.subtype?.name || "";
  } else {
    return subject.type || "";
  }
};

export default TypeCellCuration;