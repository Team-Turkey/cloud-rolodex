const { Department } = require('../models');

const departmentData = [
  {
    department_name: 'Shirts',
  },
  {
    department_name: 'Shorts',
  },
  {
    department_name: 'Music',
  },
  {
    department_name: 'Hats',
  },
  {
    department_name: 'Shoes',
  },
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;