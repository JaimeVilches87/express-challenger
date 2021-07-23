const router = require("express").Router();
const {
    notes
} = require('../../db/db');
const {
    createNewNote,
    deleteNote
} = require('../../lib/noteFunctions');


router.get('api/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

router.post('api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body, notes);
    res.json(note);
})

router.delete('api/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})


module.exports = router;