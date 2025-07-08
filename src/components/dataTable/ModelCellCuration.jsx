import ExternalLink from '../ExternalLink.jsx';
import { getResourceUrl } from './getResourceUrl.jsx';
import { getIdentifier } from './utils.jsx';

const ModelCellCuration = ({ model }) => {
  if (!model) return null;
  const identifier = getIdentifier(model);
  const url = getResourceUrl({ identifier, type: model.type, subtype: model.subtype });

  return (
    <ExternalLink href={url}>
      <span dangerouslySetInnerHTML={{ __html: model.agmFullName.displayText }} />
    </ExternalLink>
  );
};

export default ModelCellCuration;
