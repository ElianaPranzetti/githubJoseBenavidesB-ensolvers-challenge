//Manage store
import { createSlice } from '@reduxjs/toolkit';

const notas = [
    {
        _id: 4124123241,
        title: "Onota1",
        lastEdited: 12123,
        content: 'nadadadsds',
        active: true
    },
    {
        _id: 41212313441241,
        title: "nota2",
        lastEdited: 12123,
        content: 'nadadadsds',
        active: false
    },
    {
        _id: 41244241241,
        title: "nota3",
        lastEdited: 12123,
        content: 'nadadadsds',
        active:true
    },
    {
        _id: 412441341241241,
        title: "nota4",
        lastEdited: 12123,
        content: 'nadadadsds',
        active:false
    },
    {
        _id: 4124421314312441241,
        title: "nota5",
        lastEdited: 12123,
        content: 'nadadadsds',
        active:true
    },
    {
        _id: 412123412344134124241241,
        title: "nota6",
        lastEdited: 12123,
        content: 'nadadadsds',
        active:false
    }
]

const initialState = {
  notes: [...notas],
  activeNote: null,
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload
    },
    onAddNewNote: ( state, { payload }) => {
      state.activeNote = null;
      state.notes.push( payload );
    },
    onUpdateNote: ( state, { payload }) => {
      state.notes = state.notes.map( note => {
        if ( note._id === payload._id ){
          return payload;
        }
        return note
      })
      state.activeNote = null
    },
    onDeleteNote: ( state, { payload }) => {
    
        state.notes = state.notes.filter( note => note._id !== payload)
        state.activeNote = null
      
    },
    disableNote: ( state ) => {
      state.activeNote = null
    },
    archiveNote: ( state, { payload }) => {
      state.notes = state.notes.map( note => {
        if ( note._id === payload ){
            note.active = false;
            return note
        }
        return note
      })
      state.activeNote = null
    },
    unArchiveNote: ( state, { payload }) => {
      state.notes = state.notes.map( note => {
        if ( note._id === payload ){
            note.active = true;
            return note
        }
        return note
      })
      state.activeNote = null
    },

  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveNote, onAddNewNote, onUpdateNote, onDeleteNote, disableNote, archiveNote, unArchiveNote } = notesSlice.actions