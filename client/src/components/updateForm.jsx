import React from 'react';
import { useState } from 'react';
import './components.css';



const updateInput = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [amount, setAmount] = useState('');

    const handleUpdate = () => {
        if (!currencyCode || !amount) {
            console.log("please fill out ll the fields!")
            return;
        }

        console.log('successfully updated');

        //clear input feilds
        setCurrencyCode('');
        setAmount('');
    };

    return (
        <div>
            <section className="inputStyle">
                <input type="text" placeholder='Currency From' value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />
                <input type="integer" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </section>
            <section>
                <button onClick={handleUpdate}>Update</button>
            </section>


        </div>


    );

}

export default updateInput;


