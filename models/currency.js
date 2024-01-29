const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const Country = require('./country');

//define our currency model
class Currency extends Model { }

Currency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'currency',
    //timestamps: false //disable timestamps
});

// Establish association with Country model
Currency.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = Currency;
