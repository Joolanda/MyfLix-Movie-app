import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, Form } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      newUsername: null,
      newPassword: null,
      newEmail: null,
      newBirthday: null,
      favorites: [],
      movies: [],
    };
  }
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://myflix-movie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favorites: response.data.Favorites,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  // UPDATE or PUT requests for User profile
  handleProfileUpdate(
    e,
    newUsername,
    newEmail,
    newBirthday
  ) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
// revision : axios.put("my/url/goes/here", { Username: "...", password: "...", ... }, { headers: Authorization: "..." } ).then(...)
    axios
      .put(`https://myflix-movie.herokuapp.com/users/${username}`, 
        {
          Username: this.state.newUsername,
          Password: this.state.newPassword,
          Email: this.state.newEmail,
          Birthday: this.state.newBirthday,
        },
        { headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('your changes are saved!');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        })
        localStorage.setItem('user', this.state.Username);
        window.open(`/client/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  setUsername(input) {
    this.newUsername = input;
  }
  setPassword(input) {
    this.newPassword = input;
  }
  setEmail(input) {
    this.newmail = input;
  }
  setBirthday(input) {
    this.newBirthday = input;
  }


  //DELETE requests for deregistering
  handleDeleteUser = (e) => {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflix-movie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(`${username} was deleted`);
        alert("your profile is successfully deleted");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error deleting User profile");
      });
  };


  // REMOVE favorite movie from User profile movie._id
  
  handleRemoveFavorite = (e, movie) => {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://myflix-movie.herokuapp.com/users/${username}/Movies/:${movie._id}`,
        {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(`${movie.Title} was removed from Favorites`);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(err);
      });
  };

  render() {
    const { movies, favorites } = this.props;
    const favoritesList = movies.filter((movie) =>
      this.state.favorites.includes(movie._id));

    // if (favorites.length === 0) {
    //   return <div>You have no favorite movies.</div>}
            
    return (
      <Container className="profile-update-container">
        <Card
          className="border-success text-white bg-secondary mb-3"
          style={{ width: "20rem" }}
        >
          <Card.Title> My Flix Profile </Card.Title>
          <Card.Body>
          <br />
            <Card.Text>Username: {Username}</Card.Text>
            <Card.Text>Password: xxxxxx </Card.Text>
            <Card.Text>Email: {Email}</Card.Text>
            <Card.Text>Birthday: {Birthday}</Card.Text>
            <Card.Text> My favorite movies: {Favorites} </Card.Text>
            {favoritesList.map((movie) => (
              <div key={movie._id} className="Favorite-button">
                <Link to={`/movies/${movie._id}`}>
                  <Button variant='link'>{movie.Title}</Button>
                </Link>
                <Button
                  variant="info"
                  className="delete-favorite"
                  onClick={(e) => this. handleRemoveFavorite}
                    >
                    Delete favorite movies
                </Button>
                </div>
            ))}
            <br />
            <br />
            <Card.Text>If you want to update your profile, you can use this form:</Card.Text>
            <Form className="update-form"
              onSubmit={(e) =>
                this.handleProfileUpdate(
                  e,
                  this.Username,
                  this.Password,
                  this.Email,
                  this.Birthday
                )
              }
            >
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Change Username"
                  defaultValue={Username}
                  onChange={(e) => this.setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  defaultValue=""
                  onChange={(e) => this.setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Change Email"
                  defaultValue={Email}
                  onChange={(e) => this.setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Change Birthday"
                  defaultValue={Birthday}
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
              <Link to={'/user/update`}'}>
              <Button 
                variant="success" 
                className="update" 
                type="submit" 
                size="sm"
                onClick={(e) => this.handleProfileUpdate(e)}
                >
                Update
              </Button>
              </Link>
            </Form>
            <Button
              variant="danger"
              className="delete-user"
              size="sm"
              onClick={(e) => this.handleDeleteUser(e)}
            >

              Delete Profile
            </Button>
          </Card.Body>
        </Card>
        <Link to={`/`}>
          <Button variant="warning">Back to Movies</Button>
        </Link>
      </Container>
    );
  }
}
