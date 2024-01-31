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
        allowNull: false,
        references: { model: Country, key: "id" } //define foreign key which will be country's model id
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Currency',
    //timestamps: false //disable timestamps
});

// Establish association with Country model
Currency.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = Currency;
