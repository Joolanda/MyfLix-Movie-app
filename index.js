const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const bodyParser = require('body-parser');

const app = express();

let movies = [ {
  id: '1',
  title : "Harry Potter and the Philosopher\'s Stone",
  description : 'Harry Potter has lived under the stairs at his aunt and uncle\'s house his whole life. But on his 11th birthday, he learns he\'s a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school\'s kindly headmaster, Harry uncovers the truth about his parents\' deaths and about the villain who\'s to blame.',
  genre : 'Fantasy',
  director : 'Chris Columbus',
  imagePath : '',
  featured : 'true'
},
{
  id : '2',
  title : 'Back To The Future',
  description : 'It stars Michael J. Fox as teenager Marty McFly, who accidentally travels back in time, where he meets his future parents and becomes his mother\'s romantic interest.',
  genre : 'Science Fiction',
  director : 'Robert Zemeckis',
  imagePath : '',
  featured : 'true'
},
{
  id : '3',
  title : 'Jurassic Park',
  description : 'The film is set on the fictional island of Isla Nublar, located off Central America\'s Pacific Coast near Costa Rica. There,  wealthy businessman John Hammond and a team of genetic scientists have created a wildlife park of de-extinct dinosaurs.',
  genre : 'Adventure',
  director : 'Steven Spielberg',
  imagePath : '',
  featured : 'true'
},
{
  id : '4',
  title: 'Romeo + Juliet',
  description: 'In director Baz Luhrmann\'s contemporary take on William Shakespeare\'s classic tragedy, the Montagues and Capulets have moved their ongoing feud to the sweltering suburb of Verona Beach, where Romeo and Juliet fall in love and secretly wed. Though the film is visually modern, the bard\'s dialogue remains.',
  genre : 'Drama',
  director: 'Baz Luhrmann',
  imagePath : '',
  featured : 'true'
},
{
  id : '5',
  title : 'Starwars, The Rice of Skywalker',
  description : 'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.',
  genres : 'Science Fiction',
  director : 'J.J. Abrams',
  imagePath : '',
  featured : 'true'
},
{
  id : '6',
  title : 'The Blues Brothers',
  description : 'Jake Blues is just out of jail, and teams up with his brother, Elwood on a \'mission from God\' to raise funds for the orphanage in which they grew up. The only thing they can do is do what they do best: play music. So they get their old band together, and set out on their way—while getting in a bit of trouble here and there.',
  genres : 'Comedy',
  director : 'John Landis',
  imagePath : '',
  featured : 'true'
},
{
  id : '7',
  title : 'Pulp Fiction',
  description : 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.',
  genres : 'Crime',
  director : 'Quentin Tarantino',
  imagePath : '',
  featured : 'true'
},
{
  id : '8',
  title : 'Interstellar',
  description : 'Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
  genre : 'Epic',
  director : 'Christopher Nolan',
  imagePath : '',
  featured : 'true'
},
{
  id: '9',
  title: 'The Lion King',
  description : 'Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny. But not everyone in the kingdom celebrates the new cub\'s arrival. Scar, Mufasa\'s brother—and former heir to the throne—has plans of his own. The battle for Pride Rock is ravaged with betrayal, tragedy and drama, ultimately resulting in Simba\'s exile. With help from a curious pair of newfound friends, Simba will have to figure out how to grow up and take back what is rightfully his.',
  genre : 'Computer animated',
  director: 'Jon Favreau',
  imagePath : '',
  featured : 'true'
},
{
  id: '10',
  title: 'Spiderman, Far From Home',
  description : 'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
  genre : 'Action',
  director:'Jon Watts',
  imagePath : '',
  featured : 'true'
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
    name : 'Steven Spielberg',
    bio :  'Steven Allan Spielberg is considered one of the… most popular directors and producers in film history.',
    birth: '1946',
    death: ' '
},
{
    name : 'Baz Luhrmann',
    bio :  'Mark Anthony "Baz" Luhrmann is an Australian film director, …and Nicole Kidman. ',
    Birth: '1962',
    death: ' '
},
{
    name : 'J.J. Abrams',
    bio :  'Abrams has created numerous television series, including Felicity, …the saga, Star Wars: The Rise of Skywalker (2019).',
    Birth: '1966',
    death: ' '

},
{
    name : 'John Landis',
    bio :  'John Landis is an American film director, screenwriter, actor, …, music videos with singer Michael Jackson.',
    Birth: '1950',
    death: ' '
},
{
    name : 'Quentin Tarantino',
    bio :  'Quentin Jerome Tarantino is an American film director, screenwriter, …, born in Queens, New York.',
    Birth: '1963',
    death: ' '
},
{
    name : 'Christopher Nolan',
    bio :  'Christopher Edward Nolan, is a British-American film director, …, and his brother, screenwriter Jonathan Nolan.',
    Birth: '1970',
    death: ' '
},
{
    name : 'Jon Favreau',
    bio :  'Jonathan Favreau is an American actor, director, …., as co-producers in most of Favreau\'s directorial ventures.',
    Birth: '1966',
    death: ' '
},
{
    name : 'Jon Watts',
    bio :  'Jon Watts is an American film director, producer and… ,… on his chest to make himself "stand out in the field.',
    Birth: '1981',
    death: ' '
}
];
let users = [ {
  id : '0',
  username : 'Ruby Took',
  password : 'peiQu0hi4',
  email : 'RubyTook@teleworm.us',
  birthday : '1988-03-31',
  favorites : [{
    id: '8'
  }]
}
];

// use express.static
//to serve “documentation.html” file from the public folder
app.use(express.static('public'));
//library Morgan middleware fct to log all requests
app.use(morgan('common'));
//library body-parser middleware fct to log all requests
app.use(bodyParser.json());

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
//////// Movies ////////
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
// Gets the data about a single genre, by name
app.get('/genres/:name', (req, res) => {
  res.json(genres.find( (genre) =>
    { return genre.name ===req.params.name }));
});

// Gets the list of All directors
app.get('/directors', function (req, res) {
  res.json(directors)
});
// Gets the data about a single director, by name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (director) =>
    { return director.name ===req.params.name }));
});
/////// Users ///////
// Gets the list of data about All users
app.get('/users', function(req, res) {
  res.json(users);
});
// Gets the data about a single user, by username
app.get('/users/:username', (req, res) => {
  res.json(users.find( (user) =>
    { return user.username ===req.params.username  }));
});
//Posts a new user to our list of users
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});
//Deletes a user from the list by id:
app.delete('/users/:id', (req, res) => {
  let user = users.find( (user) => {
    return user.id === req.params.id });

  if (user) {
    users = users.filter(function(obj) { return obj.id !==req.params.id });
    res.status(201).send('User ' + user.username + ' with id ' + req.params.id + ' was deleted.')
  }
});

// get a user from users list by id
app.get('users/:id', (req, res) => {
  res.json(users.find( (user) =>
  { return user.id === req.params.id; }));
});

// Update the user info by id:
app.put('/users/:id', (req, res) => {
let user = users.find( (user) => {
  return user.id === req.params.id });
  let updatedUser = req.body;

  if (user && updatedUser) {
    //preserve following user data:
    updatedUser.id = user.id;
    updatedUser.favorites = user.favorites;

    Object.assign(user, updatedUser);
    users = users.map((user) => (user.id === updatedUser.id) ? updatedUser : user);
    res.status(201).send('User '+ user + 'with user ID: ' + req.params.id + 'has succesfully changed ');
  } else if (! updatedUser.username) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    res.status(404).send('User with the name ' + req.params.id + 'was not found.')
    }
  });
// List of favorite movies (of a single user)
// add a favorite movie to a user from the list
app.post('users/:id/:movie_id', (req, res)=> {
  let user = users.find( (user) => {
    return user.id === req.params.id });
  let movie = movies.find((movie) => {
    return movie.id === req.params.movie_id });

    if (user && movie) {
      user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
      res.status(201).send('User ' + user + 'favorite(s): ' + req.params.movie_id + 'are succesfully added');
    } else if (!movie) {
      res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
    } else {
      res.status(404).send('User with id ' + req.params.id + ' was not found.');
    }
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
