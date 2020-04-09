const express = require('express');
const morgan = require('morgan');

const app = express();

let movies = [ {
  id: 1,
  title : "Harry Potter and the Philosopher\'s Stone"
  ,
  director : 'Chris Columbus',
  genres : {
    name : 'Fantasy',
    description : 'A fantasy story is about magic or supernatural forces,... '
  }
},
{
  id: 2,
  title: 'Back To The Future',
  director: 'Robert Zemeckis',
  genres : {
    name : 'Science Fiction',
    description : 'Science fiction film (or sci-fi film) is a genre that ... '
  }
},
{
  id: 3,
  title: 'Jurassic Park',
  director: 'Steven Spielberg',
  genres : {
    name : 'Adventure',
    description : 'Adventure films are a genre of film that typically use their action... '
  }
},
{
  id: 4,
  title: 'Romeo + Juliet',
  director: 'Baz Luhrmann',
  genres : {
    name : 'Drama',
    description : 'Dramas are serious, plot-driven presentations, portraying realistic characters,... '
  }
},
{
  id: 5,
  title: 'Starwars, The Rice of Skywalker',
  director: 'J.J. Abrams',
  genres : {
    name : 'Science Fiction',
    description : 'Science fiction film (or sci-fi film) is a genre that ... '
  }
},
{
  id: 6,
  title: 'The Blues Brothers',
  director: 'John Landis',
  genres : {
    name : 'Comedy',
    description : 'Comedies are light-hearted plots consistently and deliberately designed to amuse... '
  }
},
{
  id: 7,
  title: 'Pulp Fiction',
  director: 'Quentin Tarantino',
  genres : {
    name : 'Crime',
    Description : 'Crime films, in the broadest sense, are a film genre inspired by and ... '
  }
},
{
  id: 8,
  title: 'Interstellar',
  director: 'Christopher Nolan',
  genres : {
    name : 'Epic',
    description : 'Epic films are a style of filmmaking with large scale, sweeping scope, and spectacle... '
  }
},
{
  id: 9,
  title: 'The Lion King',
  director: 'Jon Favreau',
  genres : {
    name : 'Computer animated',
    description : 'Computer animation is the process used for digitally generating animated images... '
  }
},
{
  id: 10,
  title: 'Spiderman, Far From Home',
  director:'Jon Watts',
  genres : {
    name : 'Action',
    description : 'Action films usually include high energy, big-budget physical stunts and chases, ... '
  }
}
];

let genres = [ {
      name : 'Fantasy',
      description : 'A fantasy story is about magic or supernatural forces,... '
  },
  {
      name : 'Science Fiction',
      description : 'Science fiction film (or sci-fi film) is a genre that ... '
  },
  {
      name : 'Adventure',
      description : 'Adventure films are a genre of film that typically use their action... '
  },
  {
      name : 'Drama',
      description : 'Dramas are serious, plot-driven presentations, portraying realistic characters,... '
  },
  {
      name : 'Comedy',
      description : 'Comedies are light-hearted plots consistently and deliberately designed to amuse... '
  },
  {
      name : 'Crime',
      description : 'Crime films, in the broadest sense, are a film genre inspired by and ... '
  },
  {
      name : 'Epic',
      description : 'Epic films are a style of filmmaking with large scale, sweeping scope, and spectacle... '
  },
  {
      name : 'Computer animated',
      description : 'Computer animation is the process used for digitally generating animated images... '
  },
  {
      name : 'Action',
      description : 'Action films usually include high energy, big-budget physical stunts and chases, ... '
  }
];

let directors = [ {
    name : 'Chris Columbus',
    bio : 'Christopher Joseph Columbus is an American film director, …, for Best Comedy Film. ',
    birth: '1958',
   death: ' '
},
{
    name : 'Robert Zemeckis',
    bio :  ' Robert Lee Zemeckis is an American director, …, has used special effects to more dramatic and narrative purpose.',
    birth: '1951',
    death: ' '
},
{
    name : ' Steven Spielberg   ',
    bio :  ' Steven Allan Spielberg is considered one of the… most popular directors and producers in film history. ',
    birth: '1946',
    death: ' '
},
{
    name : ' Baz Luhrmann ',
    bio :  'Mark Anthony "Baz" Luhrmann is an Australian film director, …and Nicole Kidman. ',
    Birth: '1962',
    death: ' '
},
{
    name : ' J.J. Abrams',
    bio :  ' Abrams has created numerous television series, including Felicity, …the saga, Star Wars: The Rise of Skywalker (2019). ',
    Birth: '1966',
    death: ' '

},
{
    name : 'John Landis',
    bio :  ' John Landis is an American film director, screenwriter, actor, …, music videos with singer Michael Jackson. ',
    Birth: '1950',
    death: ' '
},
{
    name : 'Quentin Tarantino',
    bio :  'Quentin Jerome Tarantino is an American film director, screenwriter, …, born in Queens, New York. ',
    Birth: '1963',
    death: ' '
},
{
    name : 'Christopher Nolan',
    bio :  'Christopher Edward Nolan, is a British-American film director, …, and his brother, screenwriter Jonathan Nolan. ',
    Birth: '1970',
    death: ' '
},
{
    name : 'Jon Favreau',
    bio :  'Jonathan Favreau is an American actor, director, …., as co-producers in most of Favreau\'s directorial ventures. ',
    Birth: '1966',
    death: ' '
},
{
    name : 'Jon Watts',
    bio :  ' Jon Watts is an American film director, producer and… ,… on his chest to make himself "stand out in the field. ',
    Birth: '1981',
    death: ' '
}
];

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
// Gets the list of data about All movies
app.get('/movies', function(req, res) {
  res.json(movies)
});
// Gets the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find( (movie) =>
    { return movie.title ===req.params.title  }));
});
// Gets the list of data about All genres
app.get('/genres', function(req, res) {
  res.json(genres)
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
