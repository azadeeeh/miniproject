const { Sequelize } = require("sequelize");
require('dotenv').config();
//sequelize makes tables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: true,
            },
        },
        define: {
            //timestamps: false, //disable timestamps globally
        },

    });

//test connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('successfully connected to DB')
    } catch (error) {
        console.log('error connecting to DB')
        console.log(error)
    }
}
testConnection()


//5 steps to create db 
//1- add variables in .env 
//2- config sequelize in sequelize.js
//3- create tables for each model
//4-go to routes.js and replace the hard coded data with our model
module.exports = sequelize;
