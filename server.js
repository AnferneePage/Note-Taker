const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001; // Choose a port number for your server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let data = require('./db/db.json')
let notes = [];

// Route for retrieving all notes
app.get('/api/notes', (req, res) => {
  res.json(data);
});

// Route for saving a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  data.push(newNote);
  fs.writeFile("./db/db.json", data);
});

// Route for deleting a note
// Route for deleting a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  data = data.filter((note) => note.id !== noteId);
  fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
    if (err) {
      res.status(500).send("Error writing to the database");
    } else {
      res.sendStatus(204);
    }
  });
});


// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



