const express = require('express');
const cors = require('cors');
const  path = require('path');
const app = express();


const PORT = process.env.PORT || 5000;

//Middleware for serving static files 
app.use(express.static('public'));

//send notes.html for path /notes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

//send index.html to all paths 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public' , 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Ready to listen to ${PORT}`);
})