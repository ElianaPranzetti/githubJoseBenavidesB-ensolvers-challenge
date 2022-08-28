import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NotesContainer } from "../components/notescontainer/NotesContainer"
import { useNotesStore } from "../hooks";
import { FormModal } from "../components/modal/FormModal"
import { useAuthStore } from "../hooks/useAuthStore";


export const ArchivedNotes = () => {
  
  //auth store
  const {startLogout} = useAuthStore();

  //Notes store
  const { startLoadingNotes } = useNotesStore();

  useEffect(() => {
    startLoadingNotes()
  }, []);

  return (
    <>
      <div className="d-flex gap-5 justify-content-between">
        <div className="">
          <h1 className="mt-2">Archived Notes</h1>
          <Link
            to="/"
          >
            <i className="fa-solid fa-angle-left"></i>Go back to unarchived notes
          </Link>
        </div>
        <button onClick={startLogout} className="btn btn-outline-danger btn-sm m-5">
          LogOut
        </button>
      </div> <hr/>

      <NotesContainer active={false}/>
      <FormModal />
    </>
  )
}
