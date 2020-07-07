import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
//import { RegistrationView } from '../registration-view/registration-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// bootstrap import
import { Row, Col, Card, CardDeck } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
<<<<<<< Updated upstream
      movies: null,
      selectedMovie: null,
=======
      movies: [],
  //    selectedMovie: null,
>>>>>>> Stashed changes
      user: null
    };
  }
  // old code from task 34 and before
  // componentDidMount() {
  //    axios.get('https://myflix-movie.herokuapp.com/movies')
  //     .then(response => {
  //       // Assign the result to the state
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     }); 
  // }

  // new code added with task 35
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  // get movies method, new code task 35, make a request to the movies endpoint
  getMovies(token) {
    axios.get('https://myflix-movie.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
     })
    .then(response => {
       // Assign the result to the state
       this.setState({
       movies: response.data
      });
   })
   .catch(function (error) {
   console.log(error);
   });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
<<<<<<< Updated upstream

  onResetSelectedMovie() { 
  this.setState({ 
  selectedMovie: null, 
  });
  }

=======
  
// new method for siging out, button mainview
  onLoggedOut() {
    this.setState({
      user: null
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open('/', '_self');
  }

  // onResetSelectedMovie() { 
  // this.setState({ 
  // selectedMovie: null, 
  // });
  // }
// old render-code, before implementing state routing
//   render() {
//     const { movies, selectedMovie, user } = this.state;

//     if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

//     // Before the movies have been loaded
//     if (!movies) return <div className="main-view"/>;

//     return (
//       <div className="main-view">
//       <CardDeck>
//       {selectedMovie
//          ? <MovieView movie={selectedMovie} 
//             onResetSelectedMovie={() => this.onResetSelectedMovie()}
//            />
//             : movies.map(movie => (
//              <MovieCard 
//               key={movie._id} 
//               movie={movie} 
//               onClick={movie => this.onMovieClick(movie)}
//             />
//          ))
//       }
//       </CardDeck>
//       </div>
//     );
//   }
// }


>>>>>>> Stashed changes
  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
<<<<<<< Updated upstream
      <div className="main-view">
      <CardDeck>
      {selectedMovie
         ? <MovieView movie={selectedMovie} 
            onResetSelectedMovie={() => this.onResetSelectedMovie()}
           />
            : movies.map(movie => (
             <MovieCard 
              key={movie._id} 
              movie={movie} 
              onClick={movie => this.onMovieClick(movie)}
            />
         ))
      }
      </CardDeck>
      </div>
=======
      <Router>
       <CardGroup className="main-view">
         <Navbar bg="success" variant="dark" fixed="top">
         <Navbar.Brand as={Link} to="/">MyFlix Movie</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={`/users/${username}`}>Account</Nav.Link>
                <Nav.Link onClick={(user) => this.onLoggedOut()} href="/client/">
										Logout
									</Nav.Link>
            </Nav>
          </Navbar>
         <Route exact path="/" render={() => {
           if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
           return movies.map(m => <MovieCard key={m._id} movie={m}/>)
           }
           }/>
           <Route path="/register" render={() => <RegistrationView />} />
           <Route exact path="/movies/:_id" 
              render={({match}) => <MovieView movie={movies.find(m => m._id === match.params._id)}/>}/>
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
           } />
           <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
             return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
           } />
           <Route exact path="/users/:Username" render={() => {
            return <ProfileView movies={movies} />}
            } />
        </CardGroup>
      </Router>
>>>>>>> Stashed changes
    );
  }
}
