const express = require('express');
const cors = require('cors');
const  path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

// Router imported 
const noteRoutes = require('./routes/notesRoute');

// Cors middleware
app.use(cors({
    origin: "same-origin", // All same-origin only 
    methods: ['GET, POST, DELETE'], // Allow GET, POST, DELETE HTTP methods
    optionsSuccessStatus: 200 // send '200 ok' as sucsessful preflight response, for legacy browser compatability
}));

//Middleware for serving static files 
app.use(express.static('public'));

//Router for /api/notes 
app.use('/api/notes', noteRoutes);

//send notes.html for path /notes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

//send index.html to all paths 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Server listening on localhost
app.listen(PORT, () => {
    console.log(`Server ready to listen to ${PORT}`);
})