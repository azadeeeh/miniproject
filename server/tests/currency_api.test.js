/**
 * Necessary imports, make sure you have these packages installed in your server directory
 */

const sequelize = require('../config/sequelize') // Provide a path to your config.js or database.js file, wherever you export that sequelize
const helper = require('./test_helper')
const server = require('../server') // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router
const supertest = require('supertest')
const { update } = require('../models/testCurrency')
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent


beforeEach(async () => {
    // Setup currencies table (if not already setup)
    await helper.init()

    // Clear data and load new entries for tests
    await helper.clearData()
    await helper.load()
})

describe('GET tests', () => {
    /**
     * Completed:
     * This is an example test, where we are checking if we have 2 blogs in the database as expected
     * we added the two blogs in the 'beforeEach' setup phase
     */
    test('we have 2 currencies at the start', async () => {
        const response = await api.get('/api/currency')
        expect(response.body).toHaveLength(2)
    })

    /**
     * Completed:
     * This is another example test, where we are checking if we are able to get a particular currency as expected.
     * Our test will get the first currency, the Canadian one that we added.
     * You can confirm the identiy of the currency based on the conversionRate and the currencyCode
     * We are restricting it to these two, rather than a complete equals, since the table provides other extraneous values
     * such as time of last update and so on
     */
    test('getting a specific currency', async () => {
        const canadianCurrency = helper.initialCurrencies[0]
        const getId = canadianCurrency.id

        // Verify that we get the same currency
        const response = await api
            .get(`/api/currency/${getId}`)
            .expect(200)

        // As stated above, we will compare the conversionRate and currencyCode
        const currencyReceived = response.body
        expect(canadianCurrency.conversionRate).toEqual(currencyReceived.conversionRate)
        expect(canadianCurrency.currencyCode).toEqual(currencyReceived.currencyCode)
    })
})

/**
 * The tests for POST, PUT, and DELETE are left un-implemented, and you will have to complete them
 * All the helper functions have been provided, and the examples as well are sufficient
 * You will need to do some reading on supertest documentation as well
 * 
 * IMPORTANT: You are only working with currencies, we removed the countries connection to make it a bit simpler
 */

describe('POST tests', () => {
    // Add a currency, and verify that a currency is added to our database
    test('adding a currency', async () => {
        const newCurrency = {
            currencyCode: "EUR",
            conversionRate: 0.85
        }
        //send it to the end point and get back the currency we added
        const response = await api
            .post('/api/currency')
            .send(newCurrency)
            .expect(201)
        //verify new currency added to DB
        const currenciesInDB = await helper.currenciesInDb();
        expect(currenciesInDB).toHaveLength(3); //check if there are now 3 currencies 
        //check if the currency we get back is equal to what we added
        const currencyReceived = response.body
        expect(currencyReceived.currencyCode).toEqual(newCurrency.currencyCode);
        expect(currencyReceived.conversionRate).toEqual(newCurrency.conversionRate);


    })
})

describe('PUT tests', () => {
    // Update a currency, and verify that a currency has been updated
    test('updating a currency', async () => {
        const currencies = await helper.currenciesInDb(); //get all of the currencies in DB 
        console.log(currencies);
        const updateCurrency = currencies[0]; //get the first currency
        console.log(updateCurrency);
        const currencyCode = updateCurrency.currencyCode;
        console.log(currencyCode);
        const newRate = 1.2;
        //update the currency with the specified id
        const response = await api
            .put(`/api/currency/${currencyCode}/${newRate}`)
        //.send({ conversionRate: newConversionRate })
        //.expect(200);
        console.log(response.body);
        const updatedCurrency = response.body;
        const newCurrencies = await helper.currenciesInDb();
        console.log(newCurrencies);
        expect(newCurrencies).toHaveLength(2); //check if there are still two currencies
        //make sure we updated the currency
        expect(newCurrencies.currencyCode).toEqual(updatedCurrency.currencyCode);
        expect(newCurrencies.conversionRate).toEqual(updatedCurrency.conversionRate);




    });
});

describe('DELETE tests', () => {
    // Delete a currency, and verify that a currency has been deleted
    test('deleting a currency', async () => {
        const deleteCurrency = helper.initialCurrencies[1];
        const currencyCode = deleteCurrency.currencyCode;
        //delete request
        await api
            .delete(`/api/currency/${currencyCode}`)
            .expect(201)
        //compare length of the table from 2 to 1
        const currencies = await helper.currenciesInDb()
        expect(currencies.length).toEqual(1)
        //make sure we did not delete the first currency
        const remainingCurrency = currencies[0]
        //make sure currencyCode and conversionRate of the remaining one is equal to the first currency
        expect(remainingCurrency.currencyCode).toEqual(helper.initialCurrencies[0].currencyCode);
        expect(remainingCurrency.conversionRate).toEqual(helper.initialCurrencies[0].conversionRate);

    })
})

afterAll(async () => {
    // Closes connection after all tests run
    server.close()
    await sequelize.close()
})

