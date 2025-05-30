const mongoose = require('mongoose');
const Joi = require('joi');

const schema = {
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
}

const Genre = mongoose.model('Genre', schema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
}

exports.Genre = Genre;
exports.genreSchema = schema;
exports.validate = validateGenre;