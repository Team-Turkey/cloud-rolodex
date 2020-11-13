const { Role } = require('../models');

const roleData = [
  {
    title: 'Salesperson',
    department_id: 1,
  },
  {
    title: 'Software Engineer',
    department_id: 2,
  },
  {
    title: 'Accountant',
    department_id: 3,
  },
  {
    title: 'Lawyer',
    department_id: 4,
  },
  {
    title: 'Janitor',
    department_id: 5,
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;