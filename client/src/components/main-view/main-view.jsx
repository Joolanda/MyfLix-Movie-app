import React from "react";
import axios from "axios";

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// #0
import { setMovies } from '../../actions/actions';

import { Link } from "react-router-dom";

import MoviesList from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
//import { ProfileUpdateView } from "../profile-update-view/profile-update-view";

// bootstrap import
import {
  Row,
  Col,
  Card,
  CardGroup,
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // // new method get movies, new code Task 3.5, make a request to the movies endpoint
  getMovies(token) {
    axios
      .get("https://myflix-movie.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // // 3.5 Assign the result to the state:
        //  // this.setState({
        //  // movies: response.data,
        // #1 Redux code
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // new method for signing out, button mainview
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render() {

    // #2
    let { movies } = this.props;
    let { user} = this.state;

    let username = localStorage.getItem("user");
    
    // Allowed or restricted pages: Currentpath to check which page the user is currently on
    const currentPath = window.location.pathname;
    // Add more allowed paths
    const allowedPaths = ['/register', '/login', '/'];
    if (!user && !allowedPaths.includes(currentPath)) {
    return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    }
  
    
    // if (!user) return <MainView /> />;
    // "Next, you need to move this line of the render method"and place it inside the route path (path="/")

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
                 <Nav.Link onClick={(user) => this.onLoggedOut()} href="/login">
                   Logout
                </Nav.Link>
               </Nav>
             </Navbar>
             <div>
             <Route 
              exact path="/" 
              render={() => {
                 if (!user) 
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return <MoviesList movies={movies}/>;
               }} 
              />  
             <Route 
                path="/login" 
                render={() => 
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />}
              />
              <Route 
                 path="/register" 
                 render={() => 
                  <RegistrationView />} />
              
              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                )}
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
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                    />
                  );
                }}
              />

              <Route path="/users/:Username/movies/:_Id" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>      

              <Route exact
                path="/users"
                render={() => <ProfileView movies={movies} />}
              />
              
              <Route
                exact
                path="/users/:Username"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return <ProfileView movies={movies} />;
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
let mapStateToProps = state => {
  return { movies: state.movies}
}
// #4
export default connect(mapStateToProps, { setMovies } )(MainView);
// feedback on

{/* <Route
path="/update/:Username"
render={() => 
  <ProfileUpdateView movies={movies} />}
  /> */}

// new Router code 3.6
{/* <Router basename="/client">
<div className="main-view">
  <Route exact path="/" render={() => {
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    return <MoviesList movies={movies}/>;
}} />
  <Route path="/register" render={() => <RegistrationView />} />
  <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
</div>


</Router> */}
  // Old Code before redux and flux:

      // <Router basename="/client">
      //   <div className="main-view">
      //     <CardGroup className="card-group">
      //       <Navbar bg="success" variant="dark" fixed="top">
      //         <Navbar.Brand as={Link} to="/">
      //           MyFlix Movie
      //         </Navbar.Brand>
      //         <Nav className="mr-auto">
      //           <Nav.Link as={Link} to="/">
      //             Home
      //           </Nav.Link>
      //           <Nav.Link as={Link} to={`/users/${user}`}>
      //             Profile
      //           </Nav.Link>
      //           <Nav.Link onClick={(user) => this.onLoggedOut()} href="/login">
      //             Logout
      //           </Nav.Link>
      //         </Nav>
      //       </Navbar>
      //       <div>
      //         <Route
      //           exact
      //           path="/"
      //           render={() => {
      //             if (!user)
      //               return (
      //                 <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
      //               );
      //             return <MoviesList movies={movies}/>;
      //           }} />

      //         <Route 
      //            path="/register" 
      //            render={() => 
      //             <RegistrationView />} />

      //         <Route
      //           path="/movies/:movieId"
      //           render={({ match }) => (
      //             <MovieView
      //               movie={movies.find((m) => m._id === match.params.movieId)}
      //             />
      //           )}
      //         />
      //         <Route
      //           path="/genres/:name"
      //           render={({ match }) => {
      //             if (!movies) return <CardGroup className="main-view" />;
      //             return (
      //               <GenreView
      //                 genre={
      //                   movies.find((m) => m.Genre.Name === match.params.name)
      //                     .Genre
      //                 }
      //               />
      //             );
      //           }}
      //         />
      //         <Route
      //           path="/directors/:name"
      //           render={({ match }) => {
      //             if (!movies) return <CardGroup className="main-view" />;
      //             return (
      //               <DirectorView
      //                 director={
      //                   movies.find(
      //                     (m) => m.Director.Name === match.params.name
      //                   ).Director
      //                 }
      //               />
      //             );
      //           }}
      //         />
      //         <Route exact
      //           path="/users"
      //           render={() => <ProfileView movies={movies} />}
      //         />
              
      //         <Route
      //           exact
      //           path="/users/:Username"
      //           render={() => {
      //             if (!user)
      //               return (
      //                 <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
      //               );
      //             if (movies.length === 0) return <div className="main-view" />;
      //             return <ProfileView movies={movies} />;
      //           }}
      //         />
      //       </div>
      //     </CardGroup>
      //   </div>
      // </Router>