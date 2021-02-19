import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// #0
import { setMovies, setUsers } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

// bootstrap import
import { Row, Col, Card, CardGroup, Nav, Navbar, Container } from 'react-bootstrap';

import './main-view.scss';
/**
 * @class MainView
 * @requires React
 * @requires axios from 'axios"
 * @requires PropTypes
 * @requires react-redux
 */
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      favorites: [],
    };
  }

  /**
  * @function componentDidMount
  * code executed right after the component is added to the DOM.
  * Gets what's stored in local storage and converts this stringified array back to an actual array
  * Set state acordingly
  */
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        favorites: JSON.parse(localStorage.getItem('favorites')),
      });
      // add new code?? this.props.setusers(users);
      this.getMovies(accessToken);
    }
  }

  /**
  * @function getMovies
  * Loads all movies from database
  * User needs to be logged in
  * @function getMovies
  * @param {string} token
  * @returns {array} movies
  * @axios
  */
  getMovies(token) {
    axios
      .get('https://myflix-movie.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // #1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
  * @function onLoggedIn
  * Saves logged user credentials in localStorage
  * Sets the state according to current user
  * @param {object} authData
  * @returns {state}
  * @returns {localStorage}
  */
  onLoggedIn(authData) {
    console.log(authData);
    // old code before redux users, remove??:
    this.setState({
      user: authData.user.Username,
      favorites: authData.user.Favorites,
    });
    // add new code?? this.props.setUsers(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favorites', JSON.stringify(authData.user.Favorites));
    this.getMovies(authData.token); // 'this' refers to main page here
  }

  /**
   * Logs the user out
   * @function logout
   */
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // old code before redux users:
    this.setState({
      user: null,
    });
    window.open('/client', '_self'); //  window.open("/", "_self");
  }

  /**
   * Allows the user to update (add) movies to their favorites
   * Using this new method in ProfileView
   * @param {*} newFavorites
   */
  setFavorites(newFavorites) {
    this.setState({
      favorites: newFavorites,
    });
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }

  render() {
    // #2
    let { movies } = this.props;
    let { user, favorites } = this.state;

    let username = localStorage.getItem('user');

    // Allowed or restricted pages: Currentpath to check which page the user is currently on
    const currentPath = window.location.pathname;
    // Add more allowed paths
    const allowedPaths = ['/register', '/login', '/client/register', '/', '/client', 'client/login'];
    if (!user && !allowedPaths.includes(currentPath)) {
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    }

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <div className="main-view">
          <CardGroup className="card-group">
            <Navbar bg="success" variant="dark" fixed="top">
              <Navbar.Brand as={Link} to="/">
                MyFlix Movie
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => this.onLoggedOut()} href="/login">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar>
            <div>

              <Route
                exact path="/"
                render={() => {
                  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  return (<MoviesList movies={movies} />);
                }}
              />
              <Route
                exact path="/register"
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <RegistrationView />
                  );
                }}
              />
              <Route
                path="/login"
                render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />}
              />
              <Route
                path="/movies/:movieId"
                render={({ match }) => {
                  if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);
                  return (
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      favorites={favorites}
                      setFavorites={(newFav) => this.setFavorites(newFav)}
                    />
                  );
                }}
              />
              <Route
                path="/genres/:name"
                render={({ match }) => {
                  if (!movies) return <CardGroup className="main-view" />;
                  return (
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                    />
                  );
                }}
              />
              <Route
                path="/directors/:name"
                render={({ match }) => {
                  if (!movies) return <CardGroup className="main-view" />;
                  return (
                    <DirectorView
                      director={
                        movies.find((m) => m.Director.Name === match.params.name)
                          .Director
                      }
                    />
                  );
                }}
              />
              <Route
                path="/users/:Username"
                render={() => {
                  if (!user) return (<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />);
                  return (
                    <ProfileView favorites={favorites} movies={movies}
                      setFavorites={(newFav) => this.setFavorites(newFav)}
                    />
                  );
                }}
              />
              <Route path="/users/:Username/movies/:_Id" render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieId)} />} />
              <Route
                path="/users/:Username"
                render={() => {
                  if (!user) return <LoginView getMovies={(token) => this.getMovies(token)} />;
                  if (movies.length === 0) return <div className="main-view" />;
                  return <ProfileView movies={movies} favorites={favorites} />;
                }}
              />
            </div>
          </CardGroup>
        </div>
      </Router>

    );
  }
}

// #3
const mapStateToProps = state => {
  return { movies: state.movies, users: state.users }
}
// #4
export default connect(mapStateToProps, { setMovies, setUsers })(MainView);

/*   MainView.propTypes = {
    setMovies: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired
    })).isRequired,
  } */
