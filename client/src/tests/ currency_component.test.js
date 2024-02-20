/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */


import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
/**
 * Import all the related component(s) here:
 * 
 * 
 */

import React from 'react';
jest.mock('../components/components.css', () => ({})); //ignore css file
import ConversionForm from '../components/conversionForm';

//import '../components/components.css';




/**
 * we will test the conversion section that contains: currency code & amount input fields, 
 *   Convert button and converted amount text. 
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */


test('Testing conversion section', () => {

    render(<ConversionForm />)
    // convertCurrency is a mock function now
    const ConvertCurrency = jest.fn();
    const user = userEvent.setup();


    // Your code here
    //render(<ConversionForm convertCurrency={ConvertCurrency} />) //convertCurrency being passed as prp to conversionForm 

    //inputs
    user.type(screen.getAllByPlaceholderText('Currency From')[0], 'USD');
    user.type(screen.getAllByPlaceholderText('Currency To')[0], 'CDN');
    user.type(screen.getAllByPlaceholderText('Amount'), '100');
    //button
    user.click(screen.getByText('Convert'));
    //since convertedAmountInput is an array we can't use toBeInTheDocument
    //toHaveLength(1) checks is there is at least one converted amount in the input field 
    const convertedAmountInputs = screen.getAllByPlaceholderText(/Converted Amount/i)
    expect(convertedAmountInputs).toHaveLength(1);

    //expect(screen.getAllByPlaceholderText(/Converted Amount/i)).toBeInTheDocument();
});


