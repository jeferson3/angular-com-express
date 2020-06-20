'use strict'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('usuarios', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'

});

sequelize.authenticate().then(() => {
    console.log("bd connection success");

}).catch(error => {
    console.error('bd connection denied');

})

module.exports = sequelize;