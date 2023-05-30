
function NoteCell(note) {
  console.log(note);
  const prefix = note.noteType.name === "disease_note" ? "Note:" : "Summary:";
  return note && (<div> <b>{prefix}</b> {note.freeText} </div>);
}

export default NoteCell;
