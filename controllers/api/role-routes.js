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
        model: User,
        attributes: {
            exclude: ['password']
          },
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
      model: User,
      attributes: {
        exclude: ['password']
      },
  }]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'No role found with this id.'
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

  router.post('/', withAuth, (req, res) => {
    Role.create({
        title: req.body.title,
        department_id: req.body.department_id
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', withAuth, (req, res) => {
    Role.update(req.body,  {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({
            message: 'No role found with this id.'
          });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Role.destroy({
        where: {
            id: req.params.id}
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
    });

module.exports = router;