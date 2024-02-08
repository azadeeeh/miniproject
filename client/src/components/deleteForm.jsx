import React from 'react';
import { useState } from 'react';
import './components.css';

const deleteInput = () => {
    const [currencyCode, setCurrencyCode] = useState('');


    const handleDelete = () => {
        if (!currencyCode) {
            console.log("please fill out all the fields!")
            return;
        }

        console.log('successfully deleted');

        //clear input feilds
        setCurrencyCode('');

    };

    return (
        <div>
            <section className="inputStyle">
                <input type="text" placeholder='Currency Code' value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />
            </section>
            <section>
                <button onClick={handleDelete}>Delete</button>
            </section>


        </div>


    );

}

export default deleteInput;




