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
    Role.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Department,
            attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        },
    {
        model: User
    }]
    
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;