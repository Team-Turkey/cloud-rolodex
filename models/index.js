const User = require("./User");
const Post = require("./Post");
const Vote = require('./Vote');
const Comment = require("./Comment");

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});
// With these two .belongsToMany() methods in place, we're allowing both the User and Post models to query each other's information in the context of a vote. If we want to see which users voted on a single post, we can now do that. If we want to see which posts a single user voted on, we can see that too. This makes the data more robust and gives us more capabilities for visualizing this data on the client-side.

// Notice the syntax. We instruct the application that the User and Post models will be connected, but in this case through the Vote model. We state what we want the foreign key to be in Vote, which aligns with the fields we set up in the model. We also stipulate that the name of the Vote model should be displayed as voted_posts when queried on, making it a little more informative.

// Furthermore, the Vote table needs a row of data to be a unique pairing so that it knows which data to pull in when queried on. So because the user_id and post_id pairings must be unique, we're protected from the possibility of a single user voting on one post multiple times. This layer of protection is called a 'foreign key constraint'.

// We could be done here now—but even though we're connecting the Post and User models together through the Vote model, there actually is no direct relationship between Post and Vote or User and Vote. If we want to see the total number of votes on a post, we need to directly connect the Post and Vote models.

// Let's do that next. While we're at it, we'll connect User to Vote directly as well—because why not?

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// By also creating one-to-many associations directly between these models, we can perform aggregated SQL functions between models. In this case, we'll see a total count of votes for a single post when queried. This would be difficult if we hadn't directly associated the Vote model with the other two.

// Note that we don't have to specify Comment as a through table like we did for Vote. This is because we don't need to access Post through Comment; we just want to see the user's comment and which post it was for. Thus, the query will be slightly different.
Comment.belongsTo(User, {
    foreignKey: 'user_id',
  
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
  
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
  
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
  
});

module.exports = {
    User,
    Post,
    Vote,
    Comment
};

// That's all for the models! Now you can move on to the actual creation of a vote. You may think this will involve a new set of API endpoints at /api/vote, but because a vote belongs to a post, you'll create a new endpoint at /api/post. Doing so will also keep you in line with RESTful API standards.