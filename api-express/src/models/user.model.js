const { Model, Sequelize } = require('sequelize');
const sequelize = require('../config/bd.config');

class User extends Model { }

User.init({
    
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'user'
})

// User.sync({ force: true }).then(() => {
//     console.log('create table success');

// }).catch(error => {
//     console.error("create table error ");

// })

module.exports = User;