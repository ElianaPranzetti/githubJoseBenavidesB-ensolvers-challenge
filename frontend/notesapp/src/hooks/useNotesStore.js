import { useDispatch, useSelector } from "react-redux"
import { archiveNote, disableNote, onAddNewNote, onDeleteNote, onLoadNotes, onSetActiveNote, onUpdateNote, unArchiveNote } from "../store";
import moment from 'moment'
import calendarApi from "../api/calendarApi";
import { formatDate } from "../helpers/formatDate";
import Swal from "sweetalert2";


export const useNotesStore = () => {

    const dispatch = useDispatch();

    const { notes, activeNote } = useSelector( state => state.notes ) //get the notes


    //Set active note on store
    const setActiveNote = ( note ) => {
        dispatch( onSetActiveNote( note ) )
    };

    //create note or update
    const startSavingEvent = async( note ) => {

                //is update?
                try {
                    if( note._id ){
                
                        //update note in database
                        const {data} = await calendarApi.put(`/notes/${note._id}`, note)
                        //set the store
                        dispatch( onUpdateNote({...note}));
                    } else {
                        // get the notes from DB
                        const { data } = await calendarApi.post('/notes', note);
                        const { note: newNote } = data

                        //set the store with the notes
                        dispatch( onAddNewNote({ ...newNote , lastEdited: moment(note.lastEdited).format('DD/MM/YYYY')}))
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire('Erro Save', error.response.data.errors[0].msg, 'error');
                }
    };

    //start loading note
    const startLoadingNotes = async() => {
        try {
            const { data } = await calendarApi.get('/notes');
            const notes = formatDate( data.notes );
            dispatch( onLoadNotes( notes ) )
        } catch (error) {
            console.log(error);
            console.log('Error loading notes');
        }
    }

    //delete note
    const startDeleteNote = async(_id) => {

        try {
            await calendarApi.delete(`/notes/${_id}`);
            dispatch( onDeleteNote(_id) );
        } catch (error) {
            console.log(error);
        }
    };

    //disable active note
    const setDisableNote = () => {
        dispatch( disableNote() )
    };

    //archived note
    const setArchived = async(_id, title) => {
        try {
            await calendarApi.put(`/notes/${_id}`, {title, active:false});
            dispatch( archiveNote(_id) )
        } catch (error) {
            console.log(error);
        }

    };

    //Unarchive note
    const setUnArchived = async(_id, title) => {

        try {
            await calendarApi.put(`/notes/${_id}`, {title, active:true});
            dispatch( unArchiveNote(_id) )
        } catch (error) {
            console.log(error);
        }

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
        setUnArchived,
        startLoadingNotes
    }
}
