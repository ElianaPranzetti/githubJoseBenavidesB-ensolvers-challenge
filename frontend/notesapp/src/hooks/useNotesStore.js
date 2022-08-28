import { useDispatch, useSelector } from "react-redux"
import { archiveNote, disableNote, onAddNewNote, onDeleteNote, onSetActiveNote, onUpdateNote, unArchiveNote } from "../store";
import moment from 'moment'

export const useNotesStore = () => {

    const dispatch = useDispatch();

    const { notes, activeNote } = useSelector( state => state.notes ) //get the notes


    //Set active note on store
    const setActiveNote = ( note ) => {
        dispatch( onSetActiveNote( note ) )
    };

    //create note or update
    const startSavingEvent = async( note ) => {
        //todo go backend


        if( note._id ){
            dispatch( onUpdateNote({...note}));
        } else {
            dispatch( onAddNewNote({ ...note, _id: new Date().getTime(), lastEdited: moment(new Date).format('DD/MM/YYYY'), active:true}))
        }
    };

    //delete note
    const startDeleteNote = (_id) => {
        dispatch( onDeleteNote(_id) );
    };

    //disable active note
    const setDisableNote = () => {
        dispatch( disableNote() )
    };

    //archived note
    const setArchived = (_id) => {
        dispatch( archiveNote(_id) )
    };

    //Unarchive note
    const setUnArchived = (_id) => {
        dispatch( unArchiveNote(_id) )
    };


    return  {
        //properties
        notes,
        activeNote,

        //methods
        setActiveNote,
        startSavingEvent,
        startDeleteNote,
        setDisableNote,
        setArchived,
        setUnArchived
    }
}
