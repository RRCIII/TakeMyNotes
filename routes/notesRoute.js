const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// Mock database for storing notes data
const notesData = require('../db/db.json');







module.exports = activeNote;