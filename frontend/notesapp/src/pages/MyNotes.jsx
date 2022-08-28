import { Link } from "react-router-dom"
import { FormModal } from "../components/modal/FormModal"
import { NotesContainer } from "../components/notescontainer/NotesContainer"
import { useUiStore } from "../hooks"



export const MyNotes = () => {

  //ui store
  const { openModal } = useUiStore();

  //set click to open modal
  const onClickOpenModal = (e) => {
      e.preventDefault();
      openModal();
  }

  return <>
    <div className="d-flex gap-5 ">
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
    <NotesContainer active={true}/>
    <FormModal />
  </>
}
