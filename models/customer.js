const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', {
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minLength: 10
    }
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;