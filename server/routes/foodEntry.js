const express = require("express");
const router = express.Router();
const db = require("../db-models/db-models.js");
const appControllers = require("../controller/userController.js");
const bcrypt = require("bcrypt");
const foodEntryController = require('../controller/foodEntryController');

//get food entry for one specific user 
router.get('/:id', foodEntryController.getEntry, (req, res) => {
    res.status(200).json(res.locals.entries)
})

//create food entry for a user and store in the database
router.post('/:id', foodEntryController.createEntry, (req, res) => {
    res.status(200).json(res.locals.entry)
})



module.exports = router