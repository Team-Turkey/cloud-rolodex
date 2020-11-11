const router = require('express').Router();
const sequelize = require('../config/connection');
const aws = require('aws-sdk');
const {
    User,
    Department,
    Role
} = require('../models');
const withAuth = require('../utils/auth');
const S3_BUCKET = process.env.S3_BUCKET;

router.get('/Sales', withAuth, (req, res) => {
  User.findAll({
        where: {
          "$Role.Department.name$": "Sales"
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('Sales', { 
          users, 
          loggedIn: true});
          console.log("user object being sent to handlebars", users)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });   
})

router.get('/Engineering', withAuth, (req, res) => {
  User.findAll({
    where: {
      "$Role.Department.name$": "Engineering"
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('Engineering', { 
          users, 
          loggedIn: true});
          console.log("user object being sent to handlebars", users)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });   
})

router.get('/Finance', withAuth, (req, res) => {
  User.findAll({
        where: {
          "$Role.Department.name$": "Finance"
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('Finance', { 
          users, 
          loggedIn: true});
          console.log("user object being sent to handlebars", users)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });   
})

router.get('/Legal', withAuth, (req, res) => {
  User.findAll({
        where: {
          "$Role.Department.name$": "Legal"
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('Legal', { 
          users, 
          loggedIn: true});
          console.log("user object being sent to handlebars", users)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });   
})

router.get('/Sanitation', withAuth, (req, res) => {
  User.findAll({
        where: {
          "$Role.Department.name$": "Sanitation"
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('Sanitation', { 
          users, 
          loggedIn: true});
          console.log("user object being sent to handlebars", users)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });   
})

router.get('/all-users', withAuth, (req, res) => {
  User.findAll({
        
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('all-users', { 
          users, 
          loggedIn: true});
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
    const departments = dbPostData.map((department) => department.get({plain: true}))
    
    res.render('dashboard', { 
      departments,
      id,
      loggedIn: true});
  })
  .catch(err => {
      console.log("ERROR", err);
      res.status(500).json(err);
  });
})

router.get('/users-by-name', withAuth, (req, res) => {
  User.findAll({
        where: {
          "$Role.Department.name$": "Sanitation"
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
        const users = dbPostData.map((user) => user.get({plain: true}))
        // const name = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1];
        res.render('users-by-name', { 
          users, 
          loggedIn: true});
          console.log("user object being sent to handlebars", users)
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


// router.get('/:id', withAuth, (req, res) => {
//   Department.findAll({
//     attributes: ["id", "name"]
// })
//   .then((dbPostData) => {
//     const departments = dbPostData.map((department) => department.get({plain: true}))
//     res.render('dashboard', {departments, loggedIn: true});
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// })


router.get('/edit/:id', withAuth, (req, res) => {
  User.findOne(req.body, {
    individualHooks: true,
      where: {
        id: req.params.id
      },
     
    })
    // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
            message: 'No user found with this id'
        });
        return;
    }
    console.log("DATA", dbUserData);
       // res.json(dbUserData);
      // })
      const user = dbUserData.get({
          plain: true
      });
      console.log("USER", user);
      // pass data to template
      res.render('edit-user', {
          user,
          loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
   
});


/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */
router.post('/save-details', (req, res) => {
  console.log("S3", req);
  // TODO: Read POSTed form data and do something useful
});


module.exports = router;
  
// router.get('/', (req, res) => {
//     res.render('dashboard', { loggedIn: true });
//   });

// Because the dashboard should only display posts created by the logged in user, you can add a where object to the findAll() query that uses the id saved on the session. You'll also need to serialize the Sequelize data before sending it to the template.
// router.get('/', withAuth, (req, res) => {
//     Post.findAll({
//             where: {
//                 // use the ID from the session
//                 user_id: req.session.user_id
//             },
//             attributes: [
//                 'id',
//                 'post_url',
//                 'title',
//                 'created_at',
//                 [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//             ],
//             include: [{
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             // serialize data before passing to template
//             const posts = dbPostData.map(post => post.get({
//                 plain: true
//             }));
//             res.render('dashboard', {
//                 posts,
//                 loggedIn: true
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get('/edit/:id', withAuth, (req, res) => {
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: [
//                 'id',
//                 'post_url',
//                 'title',
//                 'created_at',
//                 [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//             ],
//             include: [{
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({
//                     message: 'No post found with this id'
//                 });
//                 return;
//             }

//             // serialize the data
//             const post = dbPostData.get({
//                 plain: true
//             });

//             // pass data to template
//             res.render('edit-post', {
//                 post,
//                 loggedIn: req.session.loggedIn
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);

//https://drive.google.com/file/d/1YbFTiiloufs0356c4yB9BnaHINc16I6G/view
//         });
// });

