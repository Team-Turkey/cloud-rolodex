const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');

// router.get('/', (req, res) => {
//   res.render('homepage');
// });
// Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template engine, we can now use res.render() and specify which template we want to use. In this case, we want to render the homepage.handlebars template (the .handlebars extension is implied). This template was light on content; it only included a single <div>. Handlebars.js will automatically feed that into the main.handlebars template, however, and respond with a complete HTML file.

// The res.render() method can accept a second argument, an object, which includes all of the data you want to pass to your template.

// router.get('/', (req, res) => {
//     console.log(req.session);
//     res.render('homepage', {
//       id: 1,
//       post_url: 'https://handlebarsjs.com/guide/',
//       title: 'Handlebars Docs',
//       created_at: new Date(),
//       vote_count: 10,
//       comments: [{}, {}],
//       user: {
//         username: 'test_user'
//       }
//     });
//   });

router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        // .then(dbPostData => {
      // pass a single post object into the homepage template
    //   res.render('homepage', dbPostData[0]);
    // })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass a single post object into the homepage template
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
              });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


// What's different about this render() from last time? Our login page doesn't need any variables, so we don't need to pass a second argument to the render() method.

//   router.get('/post/:id', (req, res) => {
//     const post = {
//       id: 1,
//       post_url: 'https://handlebarsjs.com/guide/',
//       title: 'Handlebars Docs',
//       created_at: new Date(),
//       vote_count: 10,
//       comments: [{}, {}],
//       user: {
//         username: 'test_user'
//       }
//     };

// Did you notice that we're hardcoding the post data again? This is an easier way to test the template than going straight to the Sequelize query. Just imagine—if we sent the Sequelize query at this stage, then we wouldn't know where to look for errors if something went wrong. This way, if any problems arise, we know that they must originate between the client and the server.

//     res.render('single-post', { post });
//   });

// If everything looks good, you can go ahead and replace the hardcoded data with a Post.findOne() query like the one you created earlier. The route should now look like the following code:
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            // serialize the data
            const post = dbPostData.get({
                plain: true
            });

            // pass data to template
            res.render('single-post', {
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