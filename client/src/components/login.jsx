import React from 'react';
import { useState } from 'react';
import './components.css';



const loginInput = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            console.log("incorrect username or password!")
            return;
        }

        console.log('hello', username);

        //clear input feilds
        setUsername('');
        setPassword('');
    };
    const handleSignUp = () => {
        if (!username || !password) {
            console.log('please enter username and password');
            return;
        }
        console.log(" welcome", username);
        //clear input fields
        setUsername('');
        setPassword('');
    };
    return (
        <div>
            <section className="inputStyle">
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </section>
            <section className="inputStyle">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </section>
            <section>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignUp}>Sign Up</button>
            </section>
        </div>


    );

}

export default loginInput;


