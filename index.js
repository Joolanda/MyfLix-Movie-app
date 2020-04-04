const express = require('express');
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
  title: 'Jurassic Park',
  director: 'Steven Spielberg ao'
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

// GET requests
app.get('/', function(req, res) {
  res.send('Welcome to my film club!')
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
