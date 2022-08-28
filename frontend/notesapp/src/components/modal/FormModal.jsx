import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useNotesStore, useUiStore } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";

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

    // set tags
    const [tags, settags] = useState([]);

    //manage div tags
    const [divTags, setDivTags] = useState([])

    //get active modal from store
    const {isModalOpen, closeModal, openModal } = useUiStore();

    //to know active note
    const { activeNote, startSavingNote, setDisableNote, tags: storeTags} = useNotesStore();



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

    //set tags
    const onInputChangeTags = ({ target }) => {
        settags(target.value)
    };

    //handle click
    const handleClick = () => {
        if( tags.length <= 0) { return }
        else {
            setDivTags([
                ...divTags,
                tags
            ])

            setFormValues({
                ...formValues,
                tags: divTags
            })

            //console.log(formValues);
            console.log(divTags);
            settags('')
        }
    }
    
    //close modal
    const onCloseModal = () => {
        closeModal();
        setFormValues({}) //clear form values
        settags([])
        setDivTags('')
    };  

    //close modal
    const onClickCloseModal = (e) => {
        e.preventDefault()
        closeModal()
        setFormValues({}) //clear form values
        settags([])
        setDivTags('')
    };

    //manage form submit
    const onSubmitForm = async(e) => {
        e.preventDefault();
        await startSavingNote(formValues);
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

            <div className="form-2">
                    <div className="form-group row mb-2 mb-sm-5">
                        <label className="form-label col-sm-2">Categories</label>
                        <div className="tags-container">
                            {
                                (storeTags.length > 0) ? storeTags.map( tag => { console.log(tag)} ) : ''
                            }
                        </div>

                        <label className="form-label col-sm-2"></label>
                            <div className="d-flex justify-content-end gap-2">
                                <input 
                                        type="text"
                                        className="col-sm-7"
                                        placeholder="write category name"
                                        name="tags"
                                        value = { tags }
                                        autoComplete="off"
                                        onChange={onInputChangeTags}
                                    />

                                <p onClick={ handleClick } className="btn btn-success col-sm-3 mb-0">Add</p>
                            </div>
                    </div>  
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
