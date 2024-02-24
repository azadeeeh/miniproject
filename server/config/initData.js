const { sequelize, testConnection } = require("../config/sequelize");

testConnection();

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.en') });

// Import necessary modules
//const db = require('../models/testCurrency'); // Assuming this is where your database models are defined
const helper = require('../tests/test_helper'); // Assuming this is where your helper functions are defined
const Currency = process.env.NODE_ENV === "test" ? require("../models/testCurrency.js") : require("../models/currency.js");





Currency
    .sync()
    .then(() => {
        console.log("table created")
        Currency
            .bulkCreate(helper.initialCurrencies)
            .then(() => console.log('Database initialized successfully.'))
            .catch((error) => console.error('Error initializing database', error))
    })
    .catch((error) => {
        console.log('error creating table', error)
    })



