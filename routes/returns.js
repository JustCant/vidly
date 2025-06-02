const express = require('express');
const router = express.Router();
const { Rental } = require('../models/rentals');

router.post('/', async (req, res, next) => {
    if (!req.body.customerId || !req.body.movieId) {
        res.status(400).send('Customer ID not provided');
    }

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) {
        res.status(404).send('Could not find rental with the given ID.');
    }

    if (rental.dateReturned) {
        res.status(400).send('Rental has already been processed.');
    }

    res.status(401).send('Unauthorized');
});

module.exports = router;