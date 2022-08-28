import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NotesContainer } from "../components/notescontainer/NotesContainer"
import { useNotesStore } from "../hooks";
import { FormModal } from "../components/modal/FormModal"


export const ArchivedNotes = () => {
  
  const { startLoadingNotes } = useNotesStore();

  useEffect(() => {
    startLoadingNotes()
  }, []);

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
      <FormModal />
    </>
  )
}
