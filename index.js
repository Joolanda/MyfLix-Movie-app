const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// use express.static
//to serve “documentation.html” file from the public folder
app.use(express.static('public'));
//library Morgan middleware fct to log all requests
app.use(morgan('common'));
//library body-parser middleware fct to log all requests
app.use(bodyParser.json());

// get requests
app.get('/', function(req, res) {
  res.send('Welcome to my film club!')
});
app.get('/secreturl', function(req, res) {
  res.send('this is a secret url with super top-secret content.');
});
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', {
    root: __dirname
  });
});
//////// Movies ////////
// Gets the list of data about All movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
// Gets the data about a single movie, by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);
// Gets the list of data about All genres
app.get('/genres', function(req, res) {
  res.json(genres)
});
// Gets the data about a single genre, by name
app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) => {
    return genre.name === req.params.name
  }));
});

// Gets the list of All directors
app.get('/directors', function(req, res) {
  res.json(directors)
});
// Gets the data about a single director, by name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) => {
    return director.name === req.params.name
  }));
});
/////// Users ///////
// GET all users
app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
// GET a specific user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});
// ADD a user from DB using mongoose models - (replace code: Posts a new user to our list of users)
/* We'll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//DELETE a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch ((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
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

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

// ADD a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) =>
  {
    Users.findOneAndUpdate({ Username: req.params.Username
  }, {
      $push: { Favorites: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      });
    });

// remove a favorite movie from the list.
app.delete('/users/:id/:movie_id', (req, res) => {
  let user = users.find((user) => {
    return user.id === req.params.id;
  });
  let movie = movies.find((movie) => {
    return movie.id === req.params.movie_id;
  });

  if (user && movie) {
    user.favorites = user.favorites.filter((movie_id) => {
      return movie_id !== req.params.movie_id;
    });
    res.status(201).send('Movie with id ' + req.params.movie_id + ' was succesfully removed');
  } else if (!movie) {
    res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});
// error handling middleware, defined last in chain
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('My Movie app is listening on port 8080');
});
