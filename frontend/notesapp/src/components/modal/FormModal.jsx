import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useNotesStore, useUiStore } from "../../hooks";

//custom style to modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const FormModal = () => {

    //get active modal from store
    const {isModalOpen, closeModal, openModal } = useUiStore();

    //to know active note
    const { activeNote, startSavingEvent, setDisableNote } = useNotesStore();


    //form state
    const [formValues, setFormValues] = useState({ ...activeNote });

    //effect when active note
    useEffect(() => {
      if ( activeNote !== null) {
        setFormValues({...activeNote})
      }
    }, [activeNote]);


    //set values from for
    const onInputChange = ({ target }) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };
    
    //close modal
    const onCloseModal = () => {
        closeModal();
        setFormValues({}) //clear form values
    };  

    //close modal
    const onClickCloseModal = (e) => {
        e.preventDefault()
        closeModal()
        setFormValues({}) //clear form values
    };

    //manage form submit
    const onSubmitForm = async(e) => {
        e.preventDefault();
        await startSavingEvent(formValues);
        closeModal();
        setFormValues({})
    };

  return (
    <Modal 
        isOpen= { isModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className= "modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1>Create/Edit Note</h1>

        <form className="container" onSubmit={onSubmitForm}>
            <div className="form-group row">
                <label className="form-label col-sm-2">Title</label>
                <input 
                    type="text"
                    className="form control col-sm-10"
                    placeholder="Write the title"
                    name="title"
                    autoComplete="off"
                    onChange={onInputChange}
                    value={ formValues.title }
                />
            </div>

            <div className="form-group row mb-2 mb-sm-5">
                <label className="form-label col-sm-2">Content</label>
                <textarea
                    type="input"
                    className="form control col-sm-10 row-10 mt-2"
                    placeholder="Write the content"
                    name="content"
                    autoComplete="off"
                    onChange={onInputChange}
                    value={ formValues.content }
                ></textarea>
            </div>

            <div className=" d-flex gap-2 flex-row-reverse">
                <button 
                    className="btn btn-outline-danger"
                    onClick={onClickCloseModal}
                >
                    Cancel
                </button>

                <button 
                    type="submit"
                    className="btn btn-primary"
                >
                    Save
                </button>
            </div>

        </form>

    </Modal>
  )
}
