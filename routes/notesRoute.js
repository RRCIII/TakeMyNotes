const express = require("express");
const path = require("path");
const fsPromises = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

// Mock database for storing notes data
const notesData = require("../db/db.json");

// Created router
const router = express.Router();
// Middleware for parsing incoming JSON data
router.use(express.json());

//GET /api/notes
router.get("/", (req, res) => {
  res.json(notesData);
});

//POST /api/notes
router.post("/", async (req, res) => {
  // Create key of 'id', value declared as uuidv4() for the new note object
  req.body.id = uuidv4();
  notesData.push(req.body);

  const dbFilePath = path.join(__dirname, "../db/db.json");

  // WriteFile() to update db.json array; if sucessful send .json w/ status code 201 for "created"
  try {
    await fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2));
    res.status(200).json(req.body);
    console.log(notesData);
  } catch (error) {
    console.log("Error writing to mock db.json");
    res.status(500).json({ error: "Error; Note was not written to db.json" });
  }
});

// DELETE /api/notes/:id
router.delete("/:id", async (req, res) => {
  // Destructure id form req.params, being sent from the frontend index.js fetch() param
  const { id } = req.params;

  // Get index of the note with the specific id that matches in the db.json array
  const noteToDelete = notesData.findIndex((note) => note.id === id);

  if (noteToDelete === -1) {
    return res.status(404).json({ error: "Note with id not found" });
  }

  // Remove note from the db.json array
  notesData.splice(noteToDelete, 1);

  const dbFilePath = path.resolve("db", "db.json");

  // WriteFile() to update dbFilePath.json array; if successful : send status code 204 for "no-content";
  try {
    await fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2));
    res.status(204).json(notesData);
    console.log(notesData);
  } catch (error) {
    console.log("Error deleting note from mock db.json");
    res.status(500).json({ error: "Error; Note was not written to db.json" });
  }
});

module.exports = router;
