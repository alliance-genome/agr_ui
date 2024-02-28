import CollapsibleList from '../collapsibleList/collapsibleList';
import NoteCell from './NoteCell'


function RelatedNotes({relatedNotes}) {
  if(relatedNotes && relatedNotes.length > 0) {
    return (
        <CollapsibleList collapsedSize={relatedNotes.length}>
            {relatedNotes.map(NoteCell)}
        </CollapsibleList>
        );
  }
  return <></>;
}

export default RelatedNotes;