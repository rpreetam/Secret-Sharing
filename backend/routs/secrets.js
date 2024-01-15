const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Secret = require('../models/Secret');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the secrets using: GET "/api/secrets/fetchallsecrets". Login required
router.get('/fetchallsecrets', fetchuser, async (req, res) => {
    try {
        const secrets = await Secret.find();
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Add a Secret using: POST "/api/secrets/addsecret". Login required
router.post('/addsecret', fetchuser, [
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { description } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                 description
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })