import { CollapsibleList } from './collapsibleList';

const AlleleSummaryDescription = ({ notes }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <CollapsibleList>
      {notes.map((note, index) => (
        <span dangerouslySetInnerHTML={{ __html: note.freeText }} key={note.id ?? `note-${index}`} />
      ))}
    </CollapsibleList>
  );
};

export default AlleleSummaryDescription;
