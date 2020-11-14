const {
  User
} = require('../models');

const userData = [{
    username: 'jeebs',
    avatar: '/images/default.png',
    role_id: 1,
    first_name: "Jeff",
    last_name: "Johnston",
    phone: "555-555-5555",
    email: "jeff@jeff.com",
    password: "password"
  },
  {
    username: 'mee-more',
    avatar: '/images/default.png',
    role_id: 2,
    first_name: "Mandy",
    last_name: "Moore",
    phone: "555-123-4567",
    email: "mandy@mandy.com",
    password: "password"
  },
  {
    username: '007',
    avatar: '/images/default.png',
    role_id: 3,
    first_name: "James",
    last_name: "Bond",
    phone: "007-007-0070",
    email: "bond@ooseven.com",
    password: "password"
  },
  {
    username: 'Dames',
    avatar: '/images/default.png',
    role_id: 4,
    first_name: "Matt",
    last_name: "Damon",
    phone: "555-867-5309",
    email: "matt@matt.com",
    password: "password"
  },
  {
    username: 'surely',
    avatar: '/images/default.png',
    role_id: 1,
    first_name: "Shirly",
    last_name: "Temple",
    phone: "555-987-6543",
    email: "temple@xyz.com",
    password: "password"
  },
];

const seedUsers = () => {
  User.create(userData[0]);
  User.create(userData[1]);
  User.create(userData[2]);
  User.create(userData[3]);
  User.create(userData[4]);
}

module.exports = seedUsers;