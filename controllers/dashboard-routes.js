const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Department,
    Role
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    res.render('dashboard', {loggedIn: true});
})


router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll({
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Role,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        
      
        }
      },
    ]
      // we've provided an attributes key and instructed the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
    })
    .then(dbUserData => {
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      })
      // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
        })
        const post = dbUserData.get({
            plain: true
        });

        // pass data to template
        res.render('dashboard', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
     
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
//         });
// });

