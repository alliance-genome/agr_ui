import CollapsibleList from '../collapsibleList/collapsibleList.jsx';
import NoteCell from './NoteCell.jsx';

function RelatedNotes({ relatedNotes }) {
  if (relatedNotes && relatedNotes.length > 0) {
    return (
      <CollapsibleList collapsedSize={relatedNotes.length}>
        {relatedNotes.map((note) => {
          return <NoteCell key={note.freeText} note={note} />;
        })}
      </CollapsibleList>
    );
  }
  return <></>;
}

export default RelatedNotes;
