const router = require('express').Router();
const {
  Post,
  User,
  Vote,
  Comment
} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
      // attributes: ['id', 'post_url', 'title', 'created_at'],
      // update the `.findAll()` method's attributes to look like this
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      order: [
        ['created_at', 'DESC']
      ],
      // In the next step, we'll include the JOIN to the User table. We do this by adding the property include, as shown in the following code:
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
      // Notice that the include property is expressed as an array of objects. To define this object, we need a reference to the model and attributes. 
    })
    // .then(dbPostData => res.json(dbPostData))
    .then(dbPostData => {
      // pass a single post object into the homepage template
      console.log(dbPostData[0]);
      // res.render('homepage', dbPostData[0]);

      // The data that Sequelize returns is actually a Sequelize object with a lot more information attached to it than you might have been expecting. To serialize the object down to only the properties you need, you can use Sequelize's get() method.

      // res.render('homepage', dbPostData[0].get({ plain: true }));

      // This is starting to come together, but we're only accommodating one post. We need the entire array of posts to be in the template. That also means we'll need to serialize the entire array. Add the following line of code before the render() happens:
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // This will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new posts array. Now we can plug that array into the template. However, even though the render() method can accept an array instead of an object, that would prevent us from adding other properties to the template later on. To avoid future headaches, we can simply add the array to an object and continue passing an object to the template.
      // Update the render() method so it matches what's shown in the following code:
      res.render('homepage', { posts });
      //This will momentarily break the template again, because the template was set up to receive an object with an id property, title property, and so on. Now the only property it has access to is the posts array. Fortunately, Handlebars.js has built-in helpers that will allow you to perform minimal logic like looping over an array.

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
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
        model: User,
        attributes: ['username']
      }]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
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
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id
      // user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote. Make sure this PUT route is defined before the /:id PUT route, though. Otherwise, Express.js will think the word "upvote" is a valid parameter for /:id. An upvote request will differ somewhat from the PUT requests we've created before. It will involve two queries: first, using the Vote model to create a vote, then querying on that post to get an updated vote count.


// router.put('/upvote', (req, res) => {
//   // create the vote
//   Vote.create({
//     user_id: req.body.user_id,
//     post_id: req.body.post_id
//   }).then(() => {
//     // then find the post we just voted on
//     return Post.findOne({
//         where: {
//           id: req.body.post_id
//         },
//         // We just updated the route to query on the post we voted on after the vote was created. As we do so, we want to tally up the total number of votes that post has. Under some circumstances, built-in Sequelize methods can do just that—specifically one called .findAndCountAll(). Unfortunately, because we're counting an associated table's data and not the post itself, that method won't work here.
//         attributes: [
//           'id',
//           'post_url',
//           'title',
//           'created_at',
//           // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
//           [
//             sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
//             'vote_count'
//           ]
//         ]
//       })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   });
// });
// We're doing two things here (below). First, we're checking that a session exists before we even touch the database. Then if a session does exist, we're using the saved user_id property on the session to insert a new record in the vote table.

// This means that the upvote feature will only work if someone has logged in, so you should log in with a test account on the front end if you haven't already. The first time you click the upvote button, the page will refresh, and the comment count will have gone up by one. Success! If you click the button a second time, however, you'll get an error, because the Sequelize relationships don't allow duplicate entries:
router.put('/upvote', withAuth, (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Post.update({
      title: req.body.title
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
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
  Post.findOne({
    where: {id: req.params.id},
    include: [Comment]
  })
  .then(post => {
    post.comments.forEach(comment => {
      comment.destroy();
    })
    post.destroy();
    res.end();
  })
});


module.exports = router;