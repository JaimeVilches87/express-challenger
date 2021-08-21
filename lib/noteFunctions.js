const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


function read() {
    return readFileAsync('db/db.json', 'utf8');
}

function write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
}

function getNotes() {
    return this.read().then((notes) => {
        let parsedNotes;

        // If notes isn't an array or can't be turned into one, send back a new empty array
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }

        return parsedNotes;
    });
}

function addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);

}

module.exports = {
    read,
    write,
    getNotes,
    addNote,
};