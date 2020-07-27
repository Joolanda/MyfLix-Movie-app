import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, Form } from "react-bootstrap";

export class ProfileUpdateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
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
  handleProfileUpdate = (
    e,
    newUsername,
    newPassword,
    newEmail,
    newBirthday
  ) => {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(`https://myflix-movie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
      })
      .then((response) => {
        localStorage.setItem("user", this.state.Username);
        console.log(`${username} was updated`);
        alert("your profile is successfully updated");
        window.open(`/client/users/${username}`, "_self");
      })
      .catch((e) => {
        console.log("Error Updating User profile");
      });
  };
  setUsername(input) {
    this.Username = input;
  }
  setPassword(input) {
    this.Password = input;
  }
  setEmail(input) {
    this.Email = input;
  }
  setBirthday(input) {
    this.Birthday = input;
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



  render() {
    const { movies } = this.props;
    const { Favorites, Username, Email, Birthday } = this.state;

    return (
      <Container className="profile-update-container">
        <Card
          className="border-success text-white bg-secondary mb-3"
          style={{ width: "20rem" }}
        >
          <Card.Title> Update my profile </Card.Title>
          <Card.Body>
            <Card.Text>Username: {Username}</Card.Text>
            <Card.Text>Password: xxxxxx </Card.Text>
            <Card.Text>Email: {Email}</Card.Text>
            <Card.Text>Birthday: {Birthday}</Card.Text>
            <Card.Text>Favorites id: {Favorites}</Card.Text>

            <Form
              className="update-form"
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
              <Button className="update" type="submit" size="sm">
                Update
              </Button>
            </Form>
          </Card.Body>
          <Button
              variant="success"
              className="delete-user"
              onClick={(e) => this.handleDeleteUser(e)}
            >
              {" "}
              Delete Profile{" "}
            </Button>
        </Card>
        <Link to={`/`}>
          <Button variant="warning">Back to Movies</Button>
        </Link>
      </Container>
    );
  }
}

