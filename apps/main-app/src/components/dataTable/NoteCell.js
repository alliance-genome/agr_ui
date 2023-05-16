
function NoteCell(note) {
  return note && (<div> Note: {note.freeText} </div>);
}

export default NoteCell;
