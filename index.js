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
// GETs the list of data about All movies
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
// GETs the data about a single movie, by title
app.get('/movies/:Title', (req, res) => {
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
app.get('/movies/Director/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
  .then((movies) => {
    res.status(201).json('Name: '+ movies.Director.Name + ' Bio: '+ movies.Director.Bio + ' Birth: ' + movies.Director.Birth);
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send('Error: ' + err);
  });
});
 // GETs the data about a genre, by name
 // app.get('/movies/:Genre/:Name', (req, res) => {
//    Movies.findOne({ 'Genre.Name': req.params.Name })
//    .then((movies) => {
//      res.status(201).json(movies.Genre);
//    })
//    .catch((err) => {
//      console.error(err)
 //      res.status(500).send('Error: ' + err);
//    });
//   });

// GETs the data about Genre name and description by movie title
app.get('/movies/Genre/:Title', (req,res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.status(201).json('Genre of this movie is: ' + movie.Genre.Name + '. ' + movie.Genre.Description);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
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
app.post('/users/:Username/Movies/:_id', (req, res) =>
  {
    Users.findOneAndUpdate({ Username: req.params.Username
  }, {
      $push: { Favorites: req.params._id }
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

// DELETE a favorite movie from the list.
app.delete('/users/:Username/Movies/:_id', (req, res) =>
  {
    Users.findOneAndUpdate({ Username: req.params.Username
  }, {
      $pull: { Favorites: req.params._id }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser).send('Movie with ID: ' + req.params._id + ' was succesfully removed from the favorites list.')
        }
      });
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
