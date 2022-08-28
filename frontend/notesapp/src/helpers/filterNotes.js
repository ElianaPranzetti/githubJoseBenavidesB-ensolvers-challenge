
export const filterNote = ( notes=[], active = true) => {
    
    return notes.filter( note => {
        return note.active === active
        }
    )
}