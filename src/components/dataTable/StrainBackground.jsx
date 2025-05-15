import ExternalLink from '../ExternalLink.jsx';
import { getIdentifier } from './utils';


function StrainBackground({strainBackground}) {
  const indentifier = getIdentifier(strainBackground);

  if(!indentifier || !strainBackground?.name) return null;

  const strainName = <span dangerouslySetInnerHTML={{__html: strainBackground.name}}/>;
  const strain = indentifier.slice('SGD:'.length);

  return <ExternalLink href={`https://www.yeastgenome.org/strain/${strain}`}>{strainName}</ExternalLink>;
}

export default StrainBackground;
