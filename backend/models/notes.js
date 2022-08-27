const { Schema, model } = require('mongoose');

const NoteSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is necessary']
    },
    content: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    lastEdited: {
        type: Date,
        set: Date.now,
        default: Date.now
    }
});

module.exports = model( 'Notes', NoteSchema );