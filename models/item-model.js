const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

//sequelize makes a table called Item, table name's default would be Item
const Item = sequelize.define("item", {
    name: {
        type: DataTypes.INTEGER,
        allowNull: false     //if request comes without name it shouldn't accept it, it is constraint to the column name which cannot be empty 
    },
    //this.tableName:"", check syntax
});

module.exports = Item;