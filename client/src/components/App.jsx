import React from "react";
import Login from "./login";





//This is your starting parent component. Feel free to add additional components inside of the components directory. In addition, we provided utils & services directory for a reason.
//You can add additional functions to the utils that don't need to exist inside of the components. Furthermore, the services is there to make that connection
//to your server endpoints!
const App = () => {
  return (
    <div>
      <h1>Welcome to Currency Exchange</h1>
      <Login />
    </div>
  )
}

export default App;
