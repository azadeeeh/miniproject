const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Country extends Model { }

Country.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'country',
    //timestamps: false //disable timestamps
});

module.exports = Country;
