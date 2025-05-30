const express = require('express');
const router = express.Router();
const { Customer, validate } = require("../models/customer");
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0]);
    }
    
    const { name, phone, isGold } = req.body;

    let customer = new Customer({
        name,
        phone,
        isGold
    });

    customer = await customer.save();

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return res.status(404).send('The provided ID is not associated with any customer.');
    } 
    
    res.send(customer);
    
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const { name, phone, isGold } = req.body;

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name, phone, isGold }, { new: true });
    
    if (!customer) {
        return res.status(404).send('The provided ID is not associated with any customer.');
    } 

    res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
        return res.status(404).send('The provided ID is not associated with any customer.');
    } 

    res.send(customer);
});

module.exports = router;