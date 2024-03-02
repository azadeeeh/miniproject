// routes/currencyCountryRoute.js

const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');
const Country = require('../models/country');

// GET endpoint 
router.get('/currency-countryName', async (request, response) => {
    try {
        // join currency and country model by getting only required fields (currency code and Country name) using include 
        const currencyAndCountry = await Currency.findAll({
            include: [{ model: Country, attributes: ['name'] }],  //we only need name attribiute to be included from country model
            attributes: ['currencyCode'] // we only need currency code from currency model
        });

        // pairing currency code and country name to be shown in the required format
        const pair = currencyAndCountry.map(item => ({
            currencyCode: item.currencyCode,
            countryName: item.Country.name // Access the country name through the included Country model
        }));

        // Send the response
        response.json(pair);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
        response.status(404).json({ error: 'hello' });
    }
});

module.exports = router;
