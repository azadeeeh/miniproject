const express = require('express');
const currencyRouter = express.Router();

let currencies = [
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
]

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
currencyRouter.get('/', (request, response) => {
    response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
currencyRouter.get('/:id', (request, response) => {
    const requestedId = Number(request.params.id);             //getting the id from userinput in the URL and make sure it is valid number
    const requestedCurrency = currencies.find(requestedCurrency => requestedCurrency.id === requestedId);        //get the required currency with the requested id
    if (requestedCurrency) {
        response.json(requestedCurrency);
    } else {
        response.status(404).json({ error: 'resource not found' });
    }
});

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
currencyRouter.post('/', (request, response) => {
    const { currencyCode, country, conversionRate } = request.body; //  get info from user

    //error handling for empty input
    if (!currencyCode || !country || !conversionRate || currencyCode === "" || country === "" || conversionRate === "") {
        response.status(400).json({ error: 'content missing' });
        return;
    }
    //creating a new object
    const newCurrency = {
        id: currencies.length + 1,
        currencyCode,
        country,
        conversionRate
    };
    //adding the new object to the previous ones
    currencies = currencies.concat(newCurrency);

    response.json(newCurrency);
});


/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
currencyRouter.put('/:id/:newRate', (request, response) => {
    const requestedId = Number(request.params.id);    //get the id from the input
    const newRate = parseFloat(request.params.newRate); //get the newRate from the input
    //map through objects and find the one with the requestedId and update the conversionRate
    currencies = currencies.map(currency => {
        if (currency.id === requestedId) {
            return { ...currency, conversionRate: newRate };
        }
        return currency;
    });

    response.json({ message: 'Currency updated successfully' });
});


/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currencyRouter.delete('/:id', (request, response) => {
    const requestedId = Number(request.params.id); //get the id from the input
    //check if the requested id exists
    const currencyExists = currencies.find(currency => currency.id === requestedId);
    if (!currencyExists) {
        //if id does not exists, give error msg
        response.status(404).json({ error: 'unknown endpoint' });
        return;
    }
    //if the id exists delete the currency with the requested id
    currencies = currencies.filter(currency => currency.id !== requestedId); //get every opject that their id is not equal to the requestedId
    //success msg
    response.json({ message: 'Currency deleted successfully' });

})



module.exports = currencyRouter;
