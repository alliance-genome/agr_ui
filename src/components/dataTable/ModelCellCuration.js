import ExternalLink from "../ExternalLink";
import { getResourceUrl } from "./getResourceUrl";
import { getIdentifier } from "./utils";

const ModelCellCuration = ({ model }) => {
  if(!model) return null;
  const identifier = getIdentifier(model);
  const url = getResourceUrl(identifier, model.type, model.subtype)

  return (
    <ExternalLink href={url}>
      <span dangerouslySetInnerHTML={{ __html: model.name }} />
    </ExternalLink>
  );
};

export default ModelCellCuration;