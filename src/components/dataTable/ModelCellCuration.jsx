import ExternalLink from '../ExternalLink.jsx';
import { buildUrlFromTemplate } from '../../lib/utils';

/**
 * @param {object} props
 * @param {object} props.model - The AGM (Affected Genomic Model) object
 */
const ModelCellCuration = ({ model }) => {
  if (!model) return null;

  const url = buildUrlFromTemplate(model.dataProviderCrossReference);

  return (
    <ExternalLink href={url}>
      <span dangerouslySetInnerHTML={{ __html: model.agmFullName?.displayText }} />
    </ExternalLink>
  );
};

export default ModelCellCuration;
