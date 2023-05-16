import ExternalLink from '../ExternalLink';


function StrainBackground(strainBackground) {
  if(strainBackground.curie && strainBackground.name) {
    const strainName = <span dangerouslySetInnerHTML={{__html: strainBackground.name}}/>;
    return <ExternalLink href={`https://www.yeastgenome.org/strain/${strainBackground.curie}`}>{strainName}</ExternalLink>;
  }
  return null;
}

export default StrainBackground;
