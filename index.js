const express = require('express');
const morgan = require('morgan');

const app = express();

let topMovies = [ {
  title : 'Harry Potter and the Sorcerer\'s Stone'
  ,
  director : 'Chris Columbus'
},
{
  title: 'Back To The Future',
  director: 'Robert Zemeckis'
},
{
  title: 'Jurassic Park',
  director: 'Steven Spielberg'
},
{
  title: 'Romeo \+ Julia',
  director: 'Baz Luhrmann'
},
{
  title: 'Starwars, The Rice of Skywalker',
  director: 'J.J. Abrams'
},
{
  title: 'Jurassic Park',
  director: 'Steven Spielberg ao'
},
{
  title: 'Pulp Fiction',
  director: 'Quentin Tarantino'
},
{
  title: 'Interstellar',
  director: 'Christopher Nolan'
},
{
  title: 'The Lion King',
  director: 'Jon Favreau'
},
{
  title: 'Spiderman, Far From Home',
  director:'Jon Watts'
}
]
// use express.static
//to serve “documentation.html” file from the public folder
//app.use(express.static("public"));

// use middleware functions
  //library Morgan to log all requests
app.use(morgan('common'));
  // error handling, defined last in chain
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});
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

// listen for requests
app.listen(8080, () =>
 console.log('My Movie app is listening on port 8080')
);
