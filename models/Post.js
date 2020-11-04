const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model - Here, we're using JavaScript's built-in static keyword to indicate that the upvote method is one that's based on the Post model and not an instance method like we used earlier with the User model. This exemplifies Sequelize's heavy usage of object-oriented principles and concepts. We've set it up so that we can now execute Post.upvote() as if it were one of Sequelize's other built-in methods. With this upvote method, we'll pass in the value of req.body (as body) and an object of the models (as models) as parameters. Because this method will handle the complicated voting query in the /api/posts/upvote route, let's implement that query's code here.

// class Post extends Model {
//     static upvote(body, models) {
  
//     }
//   }
class Post extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }
  // See how it's almost the exact same code we implemented into the PUT route earlier? The only real difference here is that we're using models.Vote instead, and we'll pass the Vote model in as an argument from post-routes.js.
  

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
        // The user_id is conversely defined as the foreign key and will be the matching link.
      }
    }
  },
  {
      // In the second parameter of the init method, we configure the metadata, including the naming conventions.
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
