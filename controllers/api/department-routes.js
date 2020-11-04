const router = require('express').Router();
const {
  User,
  Department,
  Role
} = require('../../models');
const withAuth = require('../../utils/auth');


// GET /api/departments
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Department.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Role,
            attributes: ['id', 'title', 'department_id', 'user_id']
        }]
        // we've provided an attributes key and instructed the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;