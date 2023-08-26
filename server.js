const express = require('express');
const cors = require('cors');
const  path = require('path');
const app = express();


const PORT = process.env.PORT || 5000;


app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Ready to listen to ${PORT}`);
})