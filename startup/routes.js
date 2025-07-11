const home = require('../routes/home');
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const returns = require('../routes/returns');
const cors = require('cors');
const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use(cors());
    app.use('/', home);
    app.use('/api/customers', customers);
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);

    app.use(error);
}