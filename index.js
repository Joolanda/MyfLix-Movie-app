const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const app = express();


// Middleware //
app.use(express.static('public')); //retrieves files from public folder
app.use(morgan('common')); // logging with Morgan
app.use(bodyParser.json()); // JSON Parsing

const { check, validationResult } = require('express-validator');
const passport = require('passport');
require('./passport');

// Integrating mongoose with a REST API
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const cors = require('cors');

//Mongoose db connections
//require('dotenv').config();
//mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect( process.env.CONNECTION_URI, {useNewUrlParser: true,useUnifiedTopology: true});

// CORS origin sites to be given access:
let allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://myflix-movie-25.herokuapp.com'
];

// CORS implementation
app.use(cors({
    origin: (origin, callback) => {
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn't found on the list of allowed origins:
        let message =
          'The CORS policy for this application doesnt allow access from origin ' +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
// CORS sites use all origins
app.use(cors());

let auth = require('./auth')(app); // place auth.js file after bodyParser middleware function

// GET requests
app.get('/', function (req, res) {
  var responseText = 'Welcome to my filmclubje!'
  res.send(responseText);
});

// Movies //
// GETs the list of data about All movies
app.get(
  '/movies',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);
// GETs the data about a single movie, by title
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// GETs the data about a director, by name
app.get(
  '/movies/Director/:Name',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
      .then((movies) => {
        res
          .status(201)
          .json(
            'Name: ' +
              movies.Director.Name +
              ' Bio: ' +
              movies.Director.Bio +
              ' Birth: ' +
              movies.Director.Birth
          );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// GETs the data about Genre name and description by movie title
app.get(
  '/movies/Genre/:Title',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res
          .status(201)
          .json(
            'Genre of this movie is: ' +
              movie.Genre.Name +
              '. ' +
              movie.Genre.Description
          );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Users //
// GET all users
app.get(
  '/users',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// GET a specific user by username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

// ADD a new user to mongoose DB
app.post(
  '/users',
  // validation logic here for request
  [
    check('Username', 'Username is required').isLength({ min: 4 }),
    //  check('Username', 'Username contains non alphanummeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    //check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// UPDATE a user's info, by username
/* We'll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put(
  '/users/:Username',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Users.findOneAndUpdate(
      // allows users to update their info
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);
//REMOVE existing users by username
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// ADD a movie to a user's list of favorites
app.post(
  '/users/:Username/Movies/:_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { Favorites: req.params._id } },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// DELETE a favorite movie from the list.
app.delete(
  '/users/:Username/Movies/:_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { Favorites: req.params._id } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res
            .json(updatedUser)
            .send(
              'Movie with ID: ' +
                req.params._id +
                ' was succesfully removed from the favorites list.'
            );
        }
      }
    );
  }
);

// error handling middleware, defined last in chain
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port ' + port);
});
