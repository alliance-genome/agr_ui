function AssociationCellCuration({ association }){
  if(!association) return null;
  return association.replaceAll('_', ' ');
}

export default AssociationCellCuration;