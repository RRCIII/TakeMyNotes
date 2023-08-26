const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// Mock database for storing notes data
const notesData = require('../db/db.json');

// Created router
const router = express.Router()
// Middleware for parsing incoming JSON data
router.use(express.json());

//GET /api/notes 
router.get('/', (req, res) => {
  res.json(notesData);
});

//POST /api/notes
router.post('/', async (req, res) => {
  // Create key of 'id', value declared as uuidv4() for the new note object 
  req.body.id = uuidv4();
  notesData.push(req.body);

  const dbFilePath = path.join(__dirname, '../db/db.json');

  // WriteFile() to update db.json array; if sucessful send .json w/ status code 201 for "created"
  try {
    await fsPromises.wrtieFile(dbFilePath, JSON.stringify(notesData, null, 2))
    res.status(200).json(req.body);
    console.log(notesData);

  } catch (error) {
    console.log("Error writing to mock db.json")
    res.status(500).json({ error : "Error; Note was not written to db.json"})
  }
})



module.exports = activeNote;