import React, { useState } from 'react';
import './components.css';

const UpdateInput = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [amount, setAmount] = useState('');

    const handleUpdate = async () => {
        if (!currencyCode || !amount) {
            console.log("please fill out all the fields!");
            return;
        }
        try {
            const response = await fetch(`/api/currency/${currencyCode}/${amount}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount)
                }),
            });
            if (response.ok) {
                console.log('Currency updated successfully');
                // Clear input fields
                setCurrencyCode('');
                setAmount('');
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
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </section>
            <section>
                <button onClick={handleUpdate}>Update</button>
            </section>
        </div>
    );
}

export default UpdateInput;
