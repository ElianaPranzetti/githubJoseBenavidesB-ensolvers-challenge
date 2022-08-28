import { configureStore } from "@reduxjs/toolkit"
import { notesSlice, uiSlice } from "./"


export const store = configureStore({
    reducer: {
        notes : notesSlice.reducer,
        ui: uiSlice.reducer
    }
})