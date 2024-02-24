const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class testCurrency extends Model { }

testCurrency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'testCurrency', // modelName attribute set to testCurrency
    // timestamps: false // disable timestamps if needed
});

module.exports = testCurrency;
