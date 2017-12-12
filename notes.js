const fs = require('fs');

var fetchNotes = () => {
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }catch(e){
        return [];
    }
}
 
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title , body) => {
    
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = () => {

    return fetchNotes();

    // Approach 1
    // var notes = fetchNotes();
    // for(i=0;i<notes.length;i++){
    //     logNote(notes[i]);
    // }
} 

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title)
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

var getNote = (title) => {
     var notes = fetchNotes();
     var filteredNotes = notes.filter((note) => note.title === title);
     return filteredNotes[0];
}

var logNote = (note) => {
    console.log('--');
    console.log(`Title : ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    logNote
}


