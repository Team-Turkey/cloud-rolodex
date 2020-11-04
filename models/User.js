const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

// define table columns and configuration
User.init(
    {
      // define an id column
      id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
      },
      // define a username column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define an email column
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
          isEmail: true
        }
      },
      // define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [4]
        }
      }
    },
    {  // The nested level of the object inserted is very important. Notice that the hooks property was added to the second object in User.init().
        
//         hooks: {
//         // set up beforeCreate lifecycle "hook" functionality
//         beforeCreate(userData) {
//         return bcrypt.hash(userData.password, 10).then(newUserData => {
//         return newUserData
//     });
//   }
// },
// That seems a bit complex for such a simple async function. Notice how we needed to create two different local variables, userData and newUserData? It's a bit clunky and hard to follow due to the two variables that store the pre-hash and post-hash data, userData and newUserData, respectively.
// Good thing there is another method to handle async functions that will make the code more concise and legible. We will use the async/await syntax to replace the Promise.
// Let's replace the function above using Promises with the new version of the exact same functionality with the async/await syntax, as shown in the code below:
hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    // set up beforeUpdate lifecycle "hook" functionality
    async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
    // Before we can check to see if this hook is effective however, we must add an option to the query call. We will need to add the option { individualHooks: true }. Navigate to the query call in the user-routes.js file for the User.update function in the PUT route to update the password.
  },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;