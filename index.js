const express = require('express');
const morgan = require('morgan');

const app = express();

let topMovies = [ {
  id: 1,
  title : "Harry Potter and the Philosopher\'s Stone"
  ,
  director : 'Chris Columbus',
  genre : {
    Name : 'Fantasy',
    Description : 'A fantasy story is about magic or supernatural forces,... '
  }
},
{
  id: 2,
  title: 'Back To The Future',
  director: 'Robert Zemeckis',
  genre : {
    Name : 'Science Fiction',
    Description : 'Science fiction film (or sci-fi film) is a genre that ... '
  }
},
{
  id: 3,
  title: 'Jurassic Park',
  director: 'Steven Spielberg',
  genre : {
    Name : 'Adventure',
    Description : 'Adventure films are a genre of film that typically use their action... '
  }
},
{
  id: 4,
  title: 'Romeo + Juliet',
  director: 'Baz Luhrmann',
  genre : {
    Name : 'Drama',
    Description : 'Dramas are serious, plot-driven presentations, portraying realistic characters,... '
  }
},
{
  id: 5,
  title: 'Starwars, The Rice of Skywalker',
  director: 'J.J. Abrams',
  genre : {
    Name : 'Science Fiction',
    Description : 'Science fiction film (or sci-fi film) is a genre that ... '
  }
},
{
  id: 6,
  title: 'The Blues Brothers',
  director: 'John Landis',
  genre : {
    Name : 'Comedy',
    Description : 'Comedies are light-hearted plots consistently and deliberately designed to amuse... '
  }
},
{
  id: 7,
  title: 'Pulp Fiction',
  director: 'Quentin Tarantino',
  genre : {
    Name : 'Crime',
    Description : 'Crime films, in the broadest sense, are a film genre inspired by and ... '
  }
},
{
  id: 8,
  title: 'Interstellar',
  director: 'Christopher Nolan',
  genre : {
    Name : 'Epic',
    Description : 'Epic films are a style of filmmaking with large scale, sweeping scope, and spectacle... '
  }
},
{
  id: 9,
  title: 'The Lion King',
  director: 'Jon Favreau',
  genre : {
    Name : 'Computer animated',
    Description : 'Computer animation is the process used for digitally generating animated images... '
  }
},
{
  id: 10,
  title: 'Spiderman, Far From Home',
  director:'Jon Watts',
  genre : {
    Name : 'Action',
    Description : 'Action films usually include high energy, big-budget physical stunts and chases, ... '
  }
}
]
// use express.static
//to serve “documentation.html” file from the public folder
app.use(express.static('public'));

//library Morgan middleware fct to log all requests
app.use(morgan('common'));

// GET requests
app.get('/', function(req, res) {
  res.send('Welcome to my film club!')
});
app.get('/secreturl', function (req, res) {
  res.send('this is a secret url with super top-secret content.');
});
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root: __dirname });
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

// error handling middleware, defined last in chain
app.use(function (err, req, res, next) {
console.error(err.stack);
res.status(500).send('something broke!');
});

// listen for requests
app.listen(8080, () =>
 console.log('My Movie app is listening on port 8080')
);
