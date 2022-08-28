import { useEffect } from "react"
import { Link } from "react-router-dom"
import { FormModal } from "../components/modal/FormModal"
import { NotesContainer } from "../components/notescontainer/NotesContainer"
import { useNotesStore, useUiStore } from "../hooks"
import { useAuthStore } from "../hooks/useAuthStore"



export const MyNotes = () => {

  //auth
  const {startLogout}= useAuthStore();

  //ui store
  const { openModal } = useUiStore();

  //note store
  const { startLoadingNotes } = useNotesStore();

  //set click to open modal
  const onClickOpenModal = (e) => {
      e.preventDefault();
      openModal();
  }

  useEffect(() => {
    startLoadingNotes()
  }, []);

  return <>
    <div className="d-flex gap-5 justify-content-between">
      <div className="">
        <h1>My Notes</h1>
        <button 
          onClick={onClickOpenModal}
          className="btn btn-outline-primary btn-create m-1">
            Create Note
        </button>
        <Link to="/archived">
          Archived notes
        </Link> 
      </div>
        <button onClick={startLogout} className="btn btn-outline-danger btn-sm m-5">
          LogOut
        </button>
    </div>
    <NotesContainer active={true}/>
    <FormModal />
  </>
}
