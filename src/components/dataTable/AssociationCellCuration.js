function AssociationCellCuration({ association }){
  if(!association) return;
  return association.replaceAll('_', ' ');
}

export default AssociationCellCuration;