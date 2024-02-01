
const morgan = require('morgan');



// Middleware for logging with Morgan
const setupMorgan = (app) => {

    //app.use(morgan('tiny')); //with tiny it doesnt show the content of the POST 

    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); //customizing morgan format to include the content

    morgan.token('body', (req, res) => {
        return JSON.stringify(req.body);
    });

};

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' });
};

module.exports = { setupMorgan, unknownEndpoint };

