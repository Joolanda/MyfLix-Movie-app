const express = require("express");
bodyParser = require("body-parser");
uuid = require("uuid");
const morgan = require("morgan");
const app = express();

// app.use initializations
app.use(bodyParser.json());
app.use(morgan("common")); // Logging with Morgan
app.use(express.static("public"));

// install validator
const { check, validationResult } = require("express-validator");
//use express-validator
app.use(validator());

// Authentication(passport) and Authorization(auth)
const passport = require("passport");
require("./passport");
const auth = require("./auth")(app);

// Integrating Mongoose with a REST API
const mongoose = require("mongoose");
const Models = require("./models.js");
Movies = Models.Movie;
Users = Models.User;
Genres = Models.Genre;
Directors = Models.Director;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// installed CORS
const cors = require("cors");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin is not found on the list of allowed origins
        let message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  }),
);

// CORS sites granted acces
let allowedOrigins = [
  "http://localhost:8080",
  "https://myflix-movie-25.herokuapp.com/",
  "https://mysterious-earth-11733.herokuapp.com/",
];

// default textual response when request hits the root folder
app.get("/", function (req, res) {
  res.send("Welcome to myFlix!");
});

// INCORPORATING AUTHORIZATION INTO THE API ENDPOINTS
// Movies
//Gets the list of ALL movies
app.get("/movies", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

// Add new Movie
app.post("/movies", (req, res) => {
  Movies.findOne({ Title: req.body.Title })
    .then((movie) => {
      if (movie) {
        return res.status(400).send(req.body.Title + " already exists");
      } else {
        Movies.create({
          Title: req.body.Title,
          Description: req.body.Description,
          Genre: req.body.Genre,
          Director: req.body.Director,
          ImagePath: req.body.ImagePath,
        })
          .then((movie) => {
            res.status(201).json(movie);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Gets the data about a single movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function (movies) {
        res.json(movies);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  },
);

// Update Movie
app.put("/movies/:Title", (req, res) => {
  Movies.findOneAndUpdate(
    { Title: req.body.Title },
    {
      $set: {
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: req.body.Genre,
        Director: req.body.Director,
        ImagePath: req.body.ImagePath,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (error, updatedMovie) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedMovie);
      }
    },
  );
});

//Get the genre of a single movie based on its title
app.get(
  "/movies/genres/:Title",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.findOne({ Title: req.params.Title })
      .then(function (movie) {
        if (movie) {
          res
            .status(201)
            .send(
              "Movie with the title : " +
                movie.Title +
                " is  a " +
                movie.Genre.Name +
                " .",
            );
        } else {
          res
            .status(404)
            .send(
              "Movie with the title : " + req.params.Title + " was not found.",
            );
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  },
);

//Gets the data about a director by name
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(function (movies) {
        res.json(movies.Director);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  },
);

// Delete a movie by title
app.delete("/movies/:Title", (req, res) => {
  Movies.findOneAndRemove({ Title: req.body.Title })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.body.Title + " was not found");
      } else {
        res.status(200).send(req.body.Title + " was deleted.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// USERS REQUESTS
// Get all the users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then(function (users) {
        res.status(201).json(users);
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error" + error);
      });
  },
);

// Get user by Name
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  },
);

// Add data for a new user (Allow new users to register)
app.post(
  "users",
  [
    check("Username", "Username is required").isLength({ min: 4 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed",
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],

  (res, req) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }).then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    });
  },
);

// Update the user's information (Allow users to update their user info (username, password, email, date of birth)
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        // Allows User To Update Their Info
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      function (error, updatedUser) {
        if (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

// Add movies to user's list of favorites (Allow users to add a movie to their list of favorites)
app.post(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true }, // This line makes sure that the updated document is returned
      (error, updatedUser) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

// Remove movies from user's list of favorites (Allow users to remove a movie from their list of favorites)
app.delete(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }, // This line makes sure that the updated document is returned
      (error, updatedUser) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

// Deletes a user from list by ID (Allow existing users to deregister)
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  },
);

//Gets user profile by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  },
);

// Updates user profile
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    check("Username", "Username is required").notEmpty();
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed.",
    ).isAlphanumeric();
    check("Password", "Password is required").notEmpty();
    check("Email", "Email is required").notEmpty();
    check("Email", "Email does not appear to be valid").isEmail();

    // check the validation object for errors
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors });
    }

    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, //ensures updated user profile is returned
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error:" + err);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

// Adds movie to the users list of favourites
app.post(
  "/users/:Username/Favourites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $addToSet: { Favourites: req.params.MovieID },
      },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error:" + err);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

// Deletes user account by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(function (user) {
        if (!user) {
          res
            .status(400)
            .send(
              "Account with the username: " +
                req.params.Username +
                " was not found .",
            );
        } else {
          res
            .status(200)
            .send(
              "Account with the username : " +
                req.params.Username +
                " was successfully deleted.",
            );
        }
      })
      .catch(function (err) {
        console.error(err.stack);
        res.status(500).send("Error: " + err);
      });
  },
);

//Shows all the users for testing purposes
app.get("/users", function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Error: Check your requested URL and try again.");
  next();
});

var port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", function () {
  console.log(`Listening on Port ${port}`);
});
