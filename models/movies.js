const mongoose = require('mongoose');
const { genreSchema } = require('./genres');
const Joi = require('joi');

const Movie = mongoose.model('Movie', {
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    genre: { 
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255
    }
});

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(255)
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;