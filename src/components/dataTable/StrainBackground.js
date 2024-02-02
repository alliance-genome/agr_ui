import ExternalLink from '../ExternalLink';


function StrainBackground({strainBackground}) {
  if(strainBackground?.curie && strainBackground?.name) {
    const strainName = <span dangerouslySetInnerHTML={{__html: strainBackground.name}}/>;
    const strain = strainBackground.curie.slice('SGD:'.length);
    return <ExternalLink href={`https://www.yeastgenome.org/strain/${strain}`}>{strainName}</ExternalLink>;
  }
  return <></>;
}

export default StrainBackground;
