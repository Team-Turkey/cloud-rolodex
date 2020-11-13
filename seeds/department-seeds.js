const { Department } = require('../models');

const departmentData = [
  {
    name: 'Sales',
  },
  {
    name: 'Engineering',
  },
  {
    name: 'Finance',
  },
  {
    name: 'Legal',
  },
  {
    name: 'Sanitation',
  },
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;