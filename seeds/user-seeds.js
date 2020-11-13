const {
  User
} = require('../models');

<<<<<<< Updated upstream
const userData = [
  {
    username: 'jeebs',
    avatar: '',
=======
const userData = [{
    username: "jeebs",
    avatar: "/images/default.png",
>>>>>>> Stashed changes
    role_id: 1,
    first_name: "Jeff",
    last_name: "Johnston",
    phone: "555-555-5555",
    email: "jeff@jeff.com",
    password: "password"
  },
  {
<<<<<<< Updated upstream
    username: 'mee-more',
    avatar: '',
=======
    username: "mee-more",
    avatar: "/images/default.png",
>>>>>>> Stashed changes
    role_id: 2,
    first_name: "Mandy",
    last_name: "Moore",
    phone: "555-123-4567",
    email: "mandy@mandy.com",
    password: "password"
  },
  {
<<<<<<< Updated upstream
    username: '007',
    avatar: '',
=======
    username: "007",
    avatar: "/images/default.png",
>>>>>>> Stashed changes
    role_id: 3,
    first_name: "James",
    last_name: "Bond",
    phone: "007-007-0070",
    email: "bond@ooseven.com",
    password: "password"
  },
  {
<<<<<<< Updated upstream
    username: 'Dames',
    avatar: '',
=======
    username: "Dames",
    avatar: "/images/default.png",
>>>>>>> Stashed changes
    role_id: 4,
    first_name: "Matt",
    last_name: "Damon",
    phone: "555-867-5309",
    email: "matt@matt.com",
    password: "password"
  },
  {
<<<<<<< Updated upstream
    username: 'surely',
    avatar: '',
=======
    username: "surely",
    avatar: "/images/default.png",
>>>>>>> Stashed changes
    role_id: 1,
    first_name: "Shirly",
    last_name: "Temple",
    phone: "555-987-6543",
    email: "temple@xyz.com",
    password: "password"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;