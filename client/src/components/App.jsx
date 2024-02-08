import React from "react";
import Login from "./login";
import ConversionForm from "./conversionForm";
import AddForm from "./addCurrencyForm";
import UpdateForm from "./updateForm";
import DeleteForm from "./deleteForm";






//This is your starting parent component. Feel free to add additional components inside of the components directory. In addition, we provided utils & services directory for a reason.
//You can add additional functions to the utils that don't need to exist inside of the components. Furthermore, the services is there to make that connection
//to your server endpoints!
const App = () => {
  return (
    <div>
      <h1>Welcome to Currency Exchange</h1>
      <h1>Please enter your username and password or signup</h1>
      <Login />
      <h2>Convert</h2>
      <ConversionForm />
      <h2>Add Currency</h2>
      <AddForm />
      <h2>Update Currency</h2>
      <UpdateForm />
      <h2>Delete</h2>
      <DeleteForm />
      <footer>
        <p>Currency Conversion &copy; 2023 </p>
      </footer>

    </div>
  )
}

export default App;
