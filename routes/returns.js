const express = require('express');
const router = express.Router();
const { Rental } = require('../models/rentals');
const auth = require('../middleware/auth');
const { Movie } = require('../models/movies');
const Joi = require('joi');
const validate = require('../middleware/validate');

router.post('/', [auth, validate(validateReturn)], async (req, res, next) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) {
        res.status(404).send('Could not find rental with the given ID.');
    }

    if (rental.dateReturned) {
        res.status(400).send('Rental has already been processed.');
    }

    rental.return();
    
    await rental.save();    

    await Movie.updateOne(
        { _id: rental.movie._id },
        { $inc: { numberInStock: 1 } }
    );

    return res.send(rental);
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(req);
}

module.exports = router;