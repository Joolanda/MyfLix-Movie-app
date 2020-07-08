import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
//import { ProfileView } from '../profile-view/profile-view';

// bootstrap import
import { Row, Col, Card, CardGroup, Nav, Navbar, Container } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
  //    movie: null,
  //    selectedMovie: null,
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

  // // new code added with Task 3.5
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  
  // // new method get movies, new code Task 3.5, make a request to the movies endpoint
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

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  // onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

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

  render() {
    const { movies, user } = this.state;
    const username = localStorage.getItem('user');

   if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
       <CardGroup className="main-view">
         <Navbar bg="success" variant="dark" fixed="top">
         <Navbar.Brand as={Link} to="/">MyFlix Movie</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link href={`/client/profile/${user}`}>Account</Nav.Link>
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
           <Route path="/client/register" render={() => 
               <RegistrationView/>} />;
           <Route path="/movies/:movieId" 
              render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

          <Route path="/movies/genres/:name" render={({ match }) => {
            if (!movies) return <CardGroup className="main-view"/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
           } />
           <Route path="/movies/directors/:name" render={({ match }) => {
              if (!movies) return <CardGroup className="main-view"/>;
             return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
           } />
           <Route exact path="/users/:Username" render={() => {
            return <ProfileView movies={movies} />}
            } />
        </CardGroup>
      </Router>
    );
  }
 }

 // home link: <Nav.Link as={Link} to="/">Home</Nav.Link>