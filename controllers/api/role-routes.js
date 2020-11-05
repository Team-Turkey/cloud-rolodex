const router = require('express').Router();
const {
  User,
  Department,
  Role
} = require('../../models');
const withAuth = require('../../utils/auth');


// GET /api/roles
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

  router.get('/:id', (req, res) => {
    Role.findOne({
      where: {
        id: req.params.id
      },
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
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'No user found with this id'
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
module.exports = router;