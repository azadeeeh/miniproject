import React, { useState } from 'react';
import './components.css';
//when the user clicks add button it makes a POST request to the backend
const AddInput = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [countryId, setCountryId] = useState('');
    const [conversionRate, setConversionRate] = useState('');

    const handleAdd = async () => {
        if (!currencyCode || !countryId || !conversionRate) {
            console.log("Please fill out all the fields!");
            return;
        }

        try {
            const response = await fetch('/api/currency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currencyCode: currencyCode,
                    countryId: countryId,
                    conversionRate: parseFloat(conversionRate)
                }),
            });

            if (response.ok) {
                console.log('Currency added successfully');
                // Clear input fields
                setCurrencyCode('');
                setCountryId('');
                setConversionRate('');
            } else {
                console.log('Failed to add currency');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <section className="inputStyle">
                <input type="text" placeholder='Currency Code' value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />
                <input type="text" placeholder="Country ID" value={countryId} onChange={(e) => setCountryId(e.target.value)} />
                <input type="number" placeholder="Conversion Rate" value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} />
            </section>
            <section>
                <button onClick={handleAdd}>Add</button>
            </section>
        </div>
    );
};

export default AddInput;
