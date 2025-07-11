const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Genre } = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res, next) => {
    const genres = await Genre.find().sort('name');

    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }
    
    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();

    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {   
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res.status(404).send('The provided ID is not associated with any genre.');
    } 
    
    res.send(genre);    
});

router.put('/:id', auth, async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name }, { new: true });
    
    if (!genre) {
        return res.status(404).send('The provided ID is not associated with any genre.');
    } 

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
        return res.status(404).send('The provided ID is not associated with any genre.');
    } 

    res.send(genre);
});

module.exports = router;