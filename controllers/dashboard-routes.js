const router = require('express').Router();
const sequelize = require('../config/connection');
const aws = require('aws-sdk');
const { Op } = require("sequelize");
const {
  User,
  Department,
  Role
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/my-user-card', withAuth, (req, res) => {
  Department.findAll({
    attributes: {
      include: ['id', 'name'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbDepartmentData) => {
    const departments = dbDepartmentData.map((department) => department.get({ plain: true }));
    console.log("department pulled from db", departments)
    return departments;
    
  }).then(departments => {
    Role.findAll({
      model: Role,
      attributes: ["department_id"]
    })
    .then((dbRoleData) => {
      const roles = dbRoleData.map((role) => role.get({ plain: true }));
      console.log("department id pulled from within roles, within department", roles)
      return roles;
      
    })
    .then(roles => {
      User.findAll({
        where: {
         id: req.session.user_id
      },
      attributes: {
        include: ['id', 'first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
        exclude: ['password'],
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: [{
          model: Department,
          attributes: ["name"]
        }],
      }],
    })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('my-user-card', {
          user,
          departments,
          roles,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})


router.get('/sales', withAuth, (req, res) => {
   
  // query for department by name 
  // get the depart ID and then 
  //query roles for department id
  // get the list of role ids
  //get users who are in that list of role ids

  Department.findAll({
    attributes: {
      include: ['id', 'name'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbDepartmentData) => {
    const departments = dbDepartmentData.map((department) => department.get({ plain: true }));
    console.log("department pulled from db", departments)
    return departments;
    
  }).then(departments => {
    Role.findAll({
      model: Role,
      attributes: ["department_id"]
    })
    .then((dbRoleData) => {
      const roles = dbRoleData.map((role) => role.get({ plain: true }));
      console.log("department id pulled from within roles, within department", roles)
      return roles;
      
    })
    .then(roles => {
      User.findAll({
          where: {
           role_id: 1
        },
        attributes: {
          include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
          exclude: ['password'],
        },
        include: [{
          model: Role,
          attributes: ["id", "title", "department_id"],
          include: [{
            model: Department,
            attributes: ["name"]
          }],
        }],
      })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('sales', {
          user,
          departments,
          roles,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})

router.get('/engineering', withAuth, (req, res) => {
  Department.findAll({
    attributes: {
      include: ['id', 'name'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbDepartmentData) => {
    const departments = dbDepartmentData.map((department) => department.get({ plain: true }));
    console.log("department pulled from db", departments)
    return departments;
    
  }).then(departments => {
    Role.findAll({
      model: Role,
      attributes: ["department_id"]
    })
    .then((dbRoleData) => {
      const roles = dbRoleData.map((role) => role.get({ plain: true }));
      console.log("department id pulled from within roles, within department", roles)
      return roles;
      
    })
    .then(roles => {
      User.findAll({
        where: {
         role_id: 2
      },
      attributes: {
        include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
        exclude: ['password'],
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: [{
          model: Department,
          attributes: ["name"]
        }],
      }],
    })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('engineering', {
          user,
          departments,
          roles,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})

router.get('/finance', withAuth, (req, res) => {
 
  // query for department by name 
  // get the depart ID and then 
  //query roles for department id
  // get the list of role ids
  //get users who are in that list of role ids
  Department.findAll({
    attributes: {
      include: ['id', 'name'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbDepartmentData) => {
    const departments = dbDepartmentData.map((department) => department.get({ plain: true }));
    console.log("department pulled from db", departments)
    return departments;
    
  }).then(departments => {
    Role.findAll({
      model: Role,
      attributes: ["department_id"]
    })
    .then((dbRoleData) => {
      const roles = dbRoleData.map((role) => role.get({ plain: true }));
      console.log("department id pulled from within roles, within department", roles)
      return roles;
      
    })
    .then(roles => {
      User.findAll({
        where: {
         role_id: 3
      },
      attributes: {
        include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
        exclude: ['password'],
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: [{
          model: Department,
          attributes: ["name"]
        }],
      }],
    })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('finance', {
          user,
          departments,
          roles,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})

router.get('/legal', withAuth, (req, res) => {
  Department.findAll({
    attributes: {
      include: ['id', 'name'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbDepartmentData) => {
    const departments = dbDepartmentData.map((department) => department.get({ plain: true }));
    console.log("department pulled from db", departments)
    return departments;
    
  }).then(departments => {
    Role.findAll({
      model: Role,
      attributes: ["department_id"]
    })
    .then((dbRoleData) => {
      const roles = dbRoleData.map((role) => role.get({ plain: true }));
      console.log("department id pulled from within roles, within department", roles)
      return roles;
      
    })
    .then(roles => {
      User.findAll({
        where: {
         role_id: 4
      },
      attributes: {
        include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
        exclude: ['password'],
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: [{
          model: Department,
          attributes: ["name"]
        }],
      }],
    })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('legal', {
          user,
          departments,
          roles,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})

router.get('/sanitation', withAuth, (req, res) => {
  Department.findAll({
    attributes: {
      include: ['id', 'name'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbDepartmentData) => {
    const departments = dbDepartmentData.map((department) => department.get({ plain: true }));
    console.log("department pulled from db", departments)
    return departments;
    
  }).then(departments => {
    Role.findAll({
      model: Role,
      attributes: ["department_id"]
    })
    .then((dbRoleData) => {
      const roles = dbRoleData.map((role) => role.get({ plain: true }));
      console.log("department id pulled from within roles, within department", roles)
      return roles;
      
    })
    .then(roles => {
      User.findAll({
        where: {
         role_id: 5
      },
      attributes: {
        include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
        exclude: ['password'],
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: [{
          model: Department,
          attributes: ["name"]
        }],
      }],
    })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('sanitation', {
          user,
          departments,
          roles,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})

router.get('/all-users', withAuth, (req, res) => {
  User.findAll({

    attributes: {
      include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      res.render('all-users', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/', withAuth, (req, res) => {
  console.log("REQ", req);
  console.log("SESSION", req.session.user_id);
  const id = req.session.user_id;

  Department.findAll({
    attributes: ["id", "name"]
  })
    .then((dbPostData) => {
      const departments = dbPostData.map((department) => department.get({ plain: true }))

      res.render('dashboard', {
        departments,
        id,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log("ERROR", err);
      res.status(500).json(err);
    });
})

router.get('/users-by-name', withAuth, (req, res) => {
  console.log("QUERY STRING", req.query)
  User.findAll({
    where: {
      first_name: {
        [Op.like]: `%${req.query["first-name"]}%`
      }
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))

      console.log("user object being sent to handlebars", users);
      res.render('users-by-name', {
        users,
        loggedIn: true,
        // layout: 'nonav.handlebars'
      });
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


router.get('/:id', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findOne({

    where: {
      id: req.session.user_id
    },
    attributes: {
      exclude: ['password']
    },

    // we've provided an attributes key and instructed the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
  })
    .then(dbUserData => {
      // serialize data before passing to template
      const user = dbUserData.get({
        plain: true
      });
      res.render('dashboard', {
        user,
        loggedIn: true
      });
    })
})



const allDepts = Department.findAll({
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

  }, ]
})
const allRoles = Role.findAll({
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
    }
  ]

})



router.get('/edit/:id', withAuth, (req, res) => {
  User.findOne({
      // individualHooks: true,
      where: {
        id: req.params.id
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: {
          model: Department,
          attributes: ["name"]
        },
      }, ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id'
        });
        return;
      }
 
      const user = dbUserData.get({
        plain: true
      });
      return user;

    }).then(user => {
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
            }
          ]

        })

        .then((dbRoleData) => {

          const roles = dbRoleData.map((role) => role.get({
            plain: true
          }))
          console.log("ROLES:", roles);
          res.render('edit-user', {
              user,
              roles,
              loggedIn: req.session.loggedIn,
              
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        });
    });
});



module.exports = router;