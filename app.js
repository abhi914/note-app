

const fs = require('fs');
const _ = require('lodash')    ;
const yargs = require('yargs');

const notes = require('./notes.js');

let argv = yargs.command('Add','adds a note',{
    title: {
        describe: 'title of node',
        demand: true,
        alias: 't'
    },
    body: {
        describe: 'body of the note',
        demand: true,
        alias: 'b'
    }
})
.command('list','Prints all the note')
.command('read','read the note',{
    title: {
        describe: 'the title of note is must',
        demand: true,
        alias: 't'
    }
}).argv;



let command = argv._[0];
console.log(`command: ${command}`);





if(command === 'Add')  {

    const note = notes.addNote(argv.title,argv.body);
    if(note === undefined)
            console.log("Note is duplicate");
    else {
        console.log("Note created");
        notes.logNote(note);
    }
}


else if (command === 'list') {

   let allNotes = notes.getAll();

   allNotes.forEach((note) => notes.logNote(note));
} 
else if(command ==='read') {
    
    let recievedNote = notes.getNote(argv.title);
    if(recievedNote !== undefined) {
        console.log("Note Read");
        notes.logNote(recievedNote);
    } 
    else {
        console.log(`note not found`);
    }


}

else if (command ==='remove') {
    
    const noteRemoved = notes.removeNote(argv.title);
     var message = noteRemoved ? console.log("Note was removed") : console.log("Note not found");
}
else {

    console.log(`command not recongnised`);
}

