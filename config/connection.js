// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   });

// As of now, this will only work with your local database. Could you continue using your local database even on Heroku? Well, yes, but then you'd have to make your ports public (probably not a good idea) and always leave your computer on.

// Instead, we should make a new remote database on Heroku and tell the app to connect to that one when deployed but still use the local database when run locally. Fortunately, Heroku comes with a variety of add-ons that make setting up a remote database relatively easy. The one we'll use for MySQL is called JawsDB.

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;