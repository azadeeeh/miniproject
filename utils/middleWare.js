
const morgan = require('morgan');



// Middleware for logging with Morgan
const setupMorgan = (app) => {
    app.use(morgan('tiny'));
};

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' });
};

module.exports = { setupMorgan, unknownEndpoint };

