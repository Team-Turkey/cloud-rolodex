const seedDepartments = require('./department-seeds');
const seedRoles = require('./role-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedDepartments();
  console.log('\n----- DEPARTMENTS SEEDED -----\n');

  await seedRoles();
  console.log('\n----- ROLES SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();