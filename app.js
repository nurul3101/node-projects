
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');


const notes = require('./notes');

const title = {
    describe:'Title of note',
    demand:true,
    alias:'t'
};

const body = {
    describe:'Body of note',
    demand:true,
    alias:'b'
};

const argv = yargs.command('add','Add a new note',{
    title,
    body
}).command('list','Lists all note')
.command('read','Reads a note',{
    title
})
.command('remove','Removes a note',{
    title
})
.help().argv;

//var command = process.argv[2];
var command = argv._[0];
console.log(command);
//console.log("Process",process.argv);
console.log("Yargs", argv);

if(command === "add"){
    
   var note =  notes.addNote(argv.title , argv.body);

   if(note){
        notes.logNote(note);
   }else{
       console.log("Title already taken. Please Change the Title");
       
   }

}else if(command ==="remove"){

    var noteRemoved = notes.removeNote(argv.title);

    var message = noteRemoved ? 'Note was removed' : 'Note not found' ; 
    console.log(message);
    
}else if(command ==="read"){
    
    var note =notes.getNote(argv.title);   

    if(note){
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }

}else if(command === "list"){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));

}else{
    console.log("Command not recognized");
}