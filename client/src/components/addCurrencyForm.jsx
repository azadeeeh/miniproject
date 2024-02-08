import React from 'react';
import { useState } from 'react';
import './components.css';

const addInput = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [currencyID, setCurrencyID] = useState('');
    const [conversionRate, setConversionRate] = useState('');

    const handleAdd = () => {
        if (!currencyCode || !currencyID || !conversionRate) {
            console.log("please fill out ll the fields!")
            return;
        }

        console.log('successfully Added');

        //clear input feilds
        setCurrencyCode('');
        setCurrencyID('');
        setConversionRate('');
    };

    return (
        <div>
            <section className="inputStyle">
                <input type="text" placeholder='Currency Code' value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />
                <input type="text" placeholder="Currency ID" value={currencyID} onChange={(e) => setCurrencyID(e.target.value)} />
                <input type="integer" placeholder="Conversion Rate" value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} />
            </section>
            <section>
                <button onClick={handleAdd}>Add</button>
            </section>


        </div>


    );

}

export default addInput;


