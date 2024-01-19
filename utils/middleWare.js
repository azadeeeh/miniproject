const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const setupMiddlewares = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(morgan('tiny'));
};

module.exports = setupMiddlewares;
