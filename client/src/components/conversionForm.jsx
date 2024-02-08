import React from 'react';
import { useState } from 'react';
import './components.css';



const convertInput = () => {
    const [currencyFrom, setCurrencyFrom] = useState('');
    const [currencyTo, setCurrencyTo] = useState('');
    const [amount, setAmount] = useState('');

    const handleConvert = () => {
        if (!currencyFrom || !currencyTo || !amount) {
            console.log("please fill out ll the fields!")
            return;
        }

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
                <input type="integer" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </section>
            <section>
                <button onClick={handleConvert}>Convert</button>
            </section>
            <p>Converted Amount</p>

        </div>


    );

}

export default convertInput;


