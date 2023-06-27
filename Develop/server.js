const express = require('express');
const app = express();
const PORT = 3001; // Choose a port number for your server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let notes = [];

// Route for retrieving all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Route for saving a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Route for deleting a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  notes = notes.filter((note) => note.id !== noteId);
  res.sendStatus(204);
});

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



