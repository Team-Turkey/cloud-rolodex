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
            attributes: ['id', 'title', 'department_id'],
            
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['password']
                      },
                }]
            
        },
    ]
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // GET all Employees by Department
  router.get('getallusers/', (req, res) => {
    Department.findAll({
        where: {
            id: req.params.id
          },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: User,
            attributes: {
                exclude: ['password']
              },
        }]
      })
      .then(dbPostData => {
        console.log(dbPostData)
        if (!dbPostData) {
          res.status(404).json({
            message: 'No department found with this id'
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

  router.get('/:id', (req, res) => {
    Department.findOne({
        where: {
            id: req.params.id
          },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Role,
            attributes: ['id', 'title', 'department_id'],
            
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['password']
                      },
                }]
            
        },
    ]
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({
            message: 'No department found with this id'
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

  router.post('/', withAuth, (req, res) => {
    Department.create({
        name: req.body.name
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', withAuth, (req, res) => {
    Department.update({
        name: req.body.name
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({
            message: 'No department found with this id'
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
    Department.destroy({
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