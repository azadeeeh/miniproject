const { Sequelize } = require("sequelize");
const path = require('path');
const pg = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const databaseURL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
//sequelize makes tables
const sequelize = new Sequelize(databaseURL,

    {

        port: process.env.DB_PORT,
        //dialect: "postgres",
        dialectModule: pg,
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
