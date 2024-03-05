import React from 'react';
import { useState, useEffect } from 'react';
import './components.css';



const convertInput = () => {
    const [currencyFrom, setCurrencyFrom] = useState(''); //get value from user
    const [currencyTo, setCurrencyTo] = useState(''); //get value from user
    const [amount, setAmount] = useState(''); //get value from user
    const [convertedAmount, setConvertedAmount] = useState(''); //last amount shown to user
    const [conversionRates, setConversionRates] = useState({}); //conversion rates fetched from API

    //calling the fetchConversionRates function, [] at the end ensures it only runs once
    useEffect(() => {
        fetchConversionRates();
    }, []);

    //get data 
    const fetchConversionRates = async () => {
        try {
            const response = await fetch('/api/currency');
            const data = await response.json();
            setConversionRates(data);
        } catch (error) {
            console.error("error fetching conversion rates", error);
        }
    };

    const handleConvert = () => {
        if (!currencyFrom || !currencyTo || !amount) {
            console.log("please fill out ll the fields!")
            return;
        }
        //finding conversion rates for the selected currencies 
        const conversionRateFrom = conversionRates.find(rate => rate.currencyCode === currencyFrom);
        const conversionRateTo = conversionRates.find(rate => rate.currencyCode === currencyTo);

        if (!conversionRateFrom || !conversionRateTo) {
            console.log("Invalid conversion rates for the selected currencies!");
            return;
        }
        //calculate converted amount 
        const converted = (conversionRateTo.conversionRate / conversionRateFrom.conversionRate) * amount;

        //in case we get NAN
        if (isNaN(converted)) {
            console.log("Conversion resulted in NaN!");
            return;
        }

        setConvertedAmount(converted.toFixed(2)); //rounded to two decimal places
        console.log('successfully converted');

        //clear input feilds
        setCurrencyFrom('');
        setCurrencyTo('');
        setAmount('');
    };

    return (
        <div>
            <section className="inputStyle">
                <input type="text" placeholder='Currency From' value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)} />
                <input type="text" placeholder="Currency To" value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)} />
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </section>
            <section>
                <button onClick={handleConvert}>Convert</button>

            </section>
            <input type="text" placeholder='Converted Amount' value={convertedAmount} readOnly />

        </div>


    );

}

export default convertInput;


