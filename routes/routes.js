const express = require('express');
const router = express.Router();
const Currency = require("../models/currency.js");
const Country = require("../models/country.js");


/**let currencies = [
    {
        id: 1,
        currencyCode: "CDN",
        country: "Canada",
        conversionRate: 1
    },
    {
        id: 2,
        currencyCode: "USD",
        country: "United States of America",
        conversionRate: 0.75
    }
]**/

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
/**currencyRouter.get('/', (request, response) => {
    response.send('Hello World!')
})**/

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
router.get('/currency', async (request, response) => {
    try {
        const currencies = await Currency.findAll();
        response.status(200).json(currencies);


    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
router.get('/currency/:id', async (request, response) => {
    const requestedId = Number(request.params.id);  //getting the id from userinput in the URL and make sure it is valid number
    try {
        const requestedCurrency = await Currency.findByPk(requestedId);        //get the required currency with the requested id
        if (requestedCurrency) {
            response.json(requestedCurrency);
        } else {
            response.status(404).json({ error: 'resource not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' })
    }
});

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */


// POST a new currency
router.post('/currency', async (request, response) => {
    const { currencyCode, countryId, conversionRate } = request.body;
    //error handling for empty input
    if (!currencyCode || !countryId || !conversionRate || currencyCode === "" || countryId === "" || conversionRate === "") {
        response.status(400).json({ error: 'content missing' });
        return;
    }
    try {

        // Create a new currency entry in the database
        const newCurrency = await Currency.create({
            currencyCode,
            countryId,
            conversionRate
        });

        // Send a response with the newly created currency object
        response.status(201).json(newCurrency);
    } catch (error) {
        console.error(error);
        // Send an error response if an error occurs
        response.status(500).json({ error: 'Internal server error' });
    }
});



/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
router.put('/currency/:id/:newRate', async (request, response) => {
    const requestedId = Number(request.params.id); //get the id of the id of the currency that user wants to update
    const newRate = parseFloat(request.params.newRate); //get the new rate thats gonna be replaced with the old one
    try {
        const currencyToUpdate = await Currency.findByPk(requestedId);     //find the currency with the requested id
        if (currencyToUpdate) {
            currencyToUpdate.conversionRate = newRate; //replace the old rate with the new one
            await currencyToUpdate.save();            //save to db
            response.json({ message: 'Currency updated successfully' });
        } else {
            response.status(404).json({ error: 'Resource not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete('/currency/:id', async (request, response) => {
    const requestedId = Number(request.params.id); //get the id from the input

    try {
        const currencyToDelete = await Currency.findByPk(requestedId); //find the currency that user requested to delete
        if (currencyToDelete) {                    //if the currency exists
            await currencyToDelete.destroy();      //delete the currency
            response.json({ message: 'Currency deleted successfully' });
        } else {
            response.status(404).json({ error: 'unknown endpoint' }); //if it does not exist give error
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }

})

//routes for country model

router.get('/country', async (request, response) => {
    try {
        const countries = await Country.findAll();
        response.status(200).json({ countries });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/country', async (request, response) => {
    const { name } = request.body;
    if (!name || name === "") {
        response.status(400).json({ error: 'content missing' });
        return;
    }
    try {
        const newCountry = await Country.create({ name });
        response.status(201).json(newCountry);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }
});



router.delete('/country/:id', async (request, response) => {
    const requestedId = Number(request.params.id); //get the id from the input

    try {
        const countryToDelete = await Country.findByPk(requestedId); //find the currency that user requested to delete
        if (countryToDelete) {                    //if the currency exists
            await countryToDelete.destroy();      //delete the currency
            response.json({ message: 'Country deleted successfully' });
        } else {
            response.status(404).json({ error: 'unknown endpoint' }); //if it does not exist give error
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }

})


module.exports = router;
