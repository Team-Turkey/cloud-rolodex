const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
// This uses Heroku's process.env.PORT value when deployed and 3001 when run locally. Having a dynamic port number is important, because it is very unlikely that the port number you hardcode (e.g., 3001) would be the port Heroku runs your app on.

const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
// const hbs = exphbs.create({});
const hbs = exphbs.create({ helpers });

// The express-session library allows us to connect to the back end. The connect-session-sequelize library automatically stores the sessions created by express-session into our database.
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// This code sets up an Express.js session and connects the session to our Sequelize database. As you may be able to guess, "Super secret secret" should be replaced by an actual secret and stored in the .env file. All we need to do to tell our session to use cookies is to set cookie to be {}. If we wanted to set additional options on the cookie, like a maximum age, we would add the options to that object.

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Since we set up the routes the way we did, we don't have to worry about importing multiple files for different endpoints. The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.

// The other thing to notice is the use of {force: false} in the .sync() method. This doesn't have to be included, but if it were set to true, it would drop and re-create all of the database tables on startup. This is great for when we make changes to the Sequelize models, as the database would need a way to understand that something has changed. We'll have to do that a few times throughout this project, so it's best to keep the {force: false} there for now.