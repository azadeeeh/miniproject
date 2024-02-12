import React from 'react';
import { useState } from 'react';
import './components.css';

const deleteInput = () => {
    const [currencyCode, setCurrencyCode] = useState('');


    const handleDelete = async () => {
        if (!currencyCode) {
            console.log("please fill out all the fields!")
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/currency/${currencyCode}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (response.ok) {
                console.log('Currency deleted successfully');
                // Clear input fields
                setCurrencyCode('');

            } else {
                console.log('Failed to delete currency');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        //console.log('successfully deleted');

        //clear input feilds
        //setCurrencyCode('');

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




