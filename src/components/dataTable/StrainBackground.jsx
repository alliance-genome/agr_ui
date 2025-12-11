import ExternalLink from '../ExternalLink.jsx';
import { getIdentifier } from './utils.jsx';

function StrainBackground({ strainBackground }) {
  const identifier = getIdentifier(strainBackground);

  if (!identifier || !strainBackground?.agmFullName) return null;

  const strainName = <span dangerouslySetInnerHTML={{ __html: strainBackground.agmFullName.displayText }} />;
  const strain = identifier.slice('SGD:'.length);

  return <ExternalLink href={`https://www.yeastgenome.org/strain/${strain}`}>{strainName}</ExternalLink>;
}

export default StrainBackground;
