const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const morgan = require('morgan');

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors());
app.use(express.json());
//with morgan midleware after each request we see a log in terminal and the log gives us Request Type, URL, Status code, Response content length, Response time, Request content being sent
//example:
//Server running on port: 3001
//POST /api/currency/ 200 69 - 1.223 ms
//GET /api/currency/ 200 228 - 0.976 ms
//DELETE /api/currency/3 200 43 - 0.531 ms
app.use(morgan('tiny'));



/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
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
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get('/api/currency/:id', (request, response) => {
  const requestedId = Number(request.params.id);             //getting the id from userinput in the URL and make sure it is valid number
  const requestedCurrency = currencies.find(requestedCurrency => requestedCurrency.id === requestedId);        //get the required currency with the requested id
  if (requestedCurrency) {
    response.json(requestedCurrency);
  } else {
    response.status(404).json({ error: 'currency not found' });
  }
});

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post('/api/currency/', (request, response) => {
  const { currencyCode, country, conversionRate } = request.body; //  get info from user

  //error handling for empty input
  if (!currencyCode || !country || !conversionRate) {
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
app.put('/api/currency/:id/:newRate', (request, response) => {
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
app.delete('/api/currency/:id', (request, response) => {
  const requestedId = Number(request.params.id); //get the id from the input
  currencies = currencies.filter(currency => currency.id !== requestedId); //get every opject that their id is not equal to the requestedId
  response.json({ message: 'Currency deleted successfully' });

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})


//handling unknown endpoints
//anywhete that path does not exist this code will be executed
app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
});

