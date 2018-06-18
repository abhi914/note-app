
const fs = require('fs');

const fetchNotes = () => {
    try {
        let noteString = fs.readFileSync("notes-data.json");
        return JSON.parse(noteString);
    }
    catch(e) {
        return []; 
    }   
};

const saveFiles = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));    
};





let addNote = (title,body) => {
    
    let notes = fetchNotes();

    const note = {
        title,
        body
    };

    
    let duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveFiles(notes);        
        return note;
     }
};

let getAll = () => {
    
    return fetchNotes();
}

let getNote = (title) => {
  
    let notes = fetchNotes() ;
    let requiredNote = notes.filter((note) => note.title === title);
    if(requiredNote.length >0) 
        return requiredNote[0];
    
 }

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveFiles(filteredNotes);
    if (notes.length === filteredNotes.length)
        return false;
    else
        return true;
               
}

let logNote = (note) => {

        debugger;
        console.log(`_______________`);
        console.log(`title: ${note.title}, Body: ${note.body}`);
    
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
      
};