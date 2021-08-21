const router = require("express").Router();
const { notes
} = require('../../db/db');
const {
    createNewNote,
    deleteNote
} = require('../../lib/noteFunctions');


router.get('/notes', (req, res) => {

    getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body, notes);
    res.json(note);
})



module.exports = router;