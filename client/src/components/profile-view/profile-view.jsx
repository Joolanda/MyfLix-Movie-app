/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile-view.scss';
// bootstrap import
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap';
// ProfileView is a low-level component.Here are user’s favorite movies are listed
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.Username = null,
      this.Password = null,
      this.Email = null,
      this.Birthday = null

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      favorites: [],
      movies: [],
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  /**
  * @function getUser
  * Displaying the current user
  * @axios
  */
  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://myflix-movie.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then((response) => {
        // console.log(response)
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          favorites: response.data.Favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
  * Deletes the user's account
  * After authorizing the user, it confirms deletion in an alert 
  * Then it logs the user out and empties local storage
  * Redirects to login screen
  * @function deleteUser
  * @param {e}
  * @axios
  */
  deleteUser(e) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflix-movie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(`${username} was deleted`);
        alert("your profile is successfully deleted");
        window.open("/", "_self"); // Are is it better to use redirection this.componentDidmount here?
      })
      .catch((e) => {
        console.log("Error deleting User profile");
      });
  };

  /**
  * Update users info in the database
  * @function profileUpdate
  * @axios
  * @param {string} username
  * @param {string} password
  * @param {string} email
  * @param {date} birthday
  */
  profileUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(`https://myflix-movie.herokuapp.com/users/${username}`,
        { // UPDATE or PUT requests for User profile
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then((response) => {
        alert('your changes are saved!');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/client/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  /**
  * Logs the user out
  * @function onLoggedOut
  */
  // eslint-disable-next-line class-methods-use-this
  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  /**
    * Removes a movie from user's list of favorites
    * @function removeFavorite
    * @param {*} e
    * @param {*} movie._id
    * @axios
    */
  // eslint-disable-next-line class-methods-use-this
  removeFavorite(e, movie) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(
      `https://myflix-movie.herokuapp.com/users/${username}/favorites/:${movie}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then(() => {
        console.log(`Movie removed from your favorites`);
        window.open('/', '_self');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { movies } = this.props;
    const { favorites } = this.state;
    const favoritesList = movies.filter((movie) => favorites.includes(movie._id));
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    return (
      <Container className="profile-update-container">
        <Card
          className="border-color text-white bg-dark mb-3"
          style={{ width: '20rem' }}
        >
          <h3>
            Collection and Settings of
            <br />
            {username}
          </h3>
          <Card.Body>
            <br />
            <Card.Text>
              Username:
              {username}
            </Card.Text>
            <Card.Text>
              Email:
              {this.state.Email}
            </Card.Text>
            <Card.Text>
              Birthday:
              {this.state.Birthday}
            </Card.Text>
            <Card.Text>
              <h3>
                My Favorites:
              </h3>
            </Card.Text>
            {favoritesList.map((movie) => (
              <Row>
                <Col key={movie._id} style={{ width: "15rem" }}>
                  <Card className="favorite-movies">
                    <Card.Img variant='top' src={movie.ImagePath} />
                    <Card.Body>
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Title>{movie.Title}</Card.Title>
                      </Link>
                      <Link to="/">
                        <Button onClick={() => this.removeFavorite(movie._id)}>
                          delete this movie
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </Card.Body>
          <Card.Text>
            <h3>Change my profile settings:</h3>
            <Card.Body className="update">
              <Form className="update-form" onSubmit={(e) => this.profileUpdate(e, this.Username, this.Password, this.Email, this.Birthday)} >
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="form-label">Username:</Form.Label>
                  <Form.Control type="text" placeholder="Change Username" defaultValue={username} onChange={(e) => this.setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control type="password" placeholder="Current or New Password" defaultValue="" onChange={(e) => this.setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control type="email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} />
                </Form.Group>
                {/* <Form.Group controlId="formBasicBirthday">
                    <Form.Label className="form-label">Birthday</Form.Label>
                    <Form.Control type="date" placeholder="Change Birthday" defaultValue={Birthday}
                        onChange={(e) => this.setBirthday(e.target.value)} />
                    </Form.Group> */}
                <Button variant="primary" className="update-button" type="submit" size="md">
                  update settings
                </Button>
                <Button onClick={() => this.deleteUser()} variant="danger" className='delete-button'>delete account</Button>
              </Form>
            </Card.Body>
          </Card.Text>
        </Card>
        <Link to="/">
          <Button variant="dark">Back to Movies</Button>
        </Link>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    favorites: PropTypes.array
  })
};
export default ProfileView;
