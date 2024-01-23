const express = require('express')  // We import the express application
//const cors = require('cors') // Necessary for localhost
const currencyRouter = require('./routes/routes')
//const morgan = require('morgan');
const middlewares = require('./utils/middleWare');
const cors = require('cors');
const app = express() // Creates an express application in app

//this is my assignment2 branch

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
//app.use(cors());
//app.use(express.json());
//with morgan midleware after each request we see a log in terminal and the log gives us Request Type, URL, Status code, Response content length, Response time, Request content being sent
//example:
//Server running on port: 3001
//POST /api/currency/ 200 69 - 1.223 ms
//GET /api/currency/ 200 228 - 0.976 ms
//DELETE /api/currency/3 200 43 - 0.531 ms
//app.use(morgan('tiny'));
//setup middleware
app.use(cors());
app.use(express.json()); //parse requests 
middlewares.setupMorgan(app);



//setup routes
app.use('/api/currency', currencyRouter);  // Add currency routes

app.use(middlewares.unknownEndpoint);




/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})




