import ExternalLink from "../ExternalLink";
import { getResourceUrl } from "./getResourceUrl";
import { getIdentifier } from "./utils";

const ModelCellCuration = ({ model }) => {
  if(!model) return null;
  const identifier = getIdentifier(model);
  const url = getResourceUrl({identifier, type: model.type, subtype: model.subtype})

  return (
    <ExternalLink href={url}>
      <span dangerouslySetInnerHTML={{ __html: model.agmFullName.displayText }} />
    </ExternalLink>
  );
};

export default ModelCellCuration;