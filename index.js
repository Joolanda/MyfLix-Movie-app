const express = require('express');
const morgan = require('morgan');

const app = express();

let topMovies = [ {
  id: 1,
  title : 'Harry Potter and the Sorcerer\'s Stone'
  ,
  director : 'Chris Columbus'
},
{
  id: 2,
  title: 'Back To The Future',
  director: 'Robert Zemeckis'
},
{
  id: 3,
  title: 'Jurassic Park',
  director: 'Steven Spielberg'
},
{
  id: 4,
  title: 'Romeo + Julia',
  director: 'Baz Luhrmann'
},
{
  id: 5,
  title: 'Starwars, The Rice of Skywalker',
  director: 'J.J. Abrams'
},
{
  id: 6,
  title: 'The Blues Brothers',
  director: 'John Landis'
},
{
  id: 7,
  title: 'Pulp Fiction',
  director: 'Quentin Tarantino'
},
{
  id: 8,
  title: 'Interstellar',
  director: 'Christopher Nolan'
},
{
  id: 9,
  title: 'The Lion King',
  director: 'Jon Favreau'
},
{
  id: 10,
  title: 'Spiderman, Far From Home',
  director:'Jon Watts'
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
