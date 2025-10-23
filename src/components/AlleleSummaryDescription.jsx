import { CollapsibleList } from "./collapsibleList";

const AlleleSummaryDescription = ({ notes }) => {
  const noteNames = notes.map(note => note.freeText);
  return <CollapsibleList>{noteNames}</CollapsibleList>;
};

export default AlleleSummaryDescription;
