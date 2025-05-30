const mongoose = require('mongoose');

// Middleware to validate ObjectId format
module.exports = function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send('Invalid ID format.');
    }

    next();
}