import CollapsibleList from '../collapsibleList/collapsibleList';
import NoteCell from './NoteCell'


function RelatedNotes(relatedNotes) {
  if(relatedNotes.length > 0) {
    return (
        <CollapsibleList collapsedSize={relatedNotes.length}>
            {relatedNotes.map(NoteCell)}
        </CollapsibleList>
        );
  }
  return null;
}

export default RelatedNotes;