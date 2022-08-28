import { Link } from "react-router-dom";
import { NotesContainer } from "../components/notescontainer/NotesContainer"



export const ArchivedNotes = () => {

  return (
    <>
      <div className="d-flex gap-5 ">
      <h1 className="mt-2">Archived Notes</h1>
      <Link
        to="/"
      >
        <i className="fa-solid fa-angle-left"></i>Go back to unarchived notes
      </Link> 
      </div> <hr/>

      <NotesContainer active={false}/>
    </>
  )
}
