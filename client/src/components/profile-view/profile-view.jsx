import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, ButtonGroup } from 'react-bootstrap';

export class ProfileView extends React.Component {

constructor(props) {
  super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
      movies: []
    };
  }
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://myflix-movie.herokuapp.com/users/${username}`, {
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

// // UPDATE or PUT requests for User profile
// handleProfileUpdate = (e, createUsername, createPassword, createEmail, createBirthday) => {
//   e.preventDefault();

//   const username = localStorage.getItem('user');
//   const token = localStorage.getItem('token');

//   axios.put(`https://myflix-movie.herokuapp.com/users/${username}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     data: {
//       Username: createUsername ? createwUsername : this.state.Username,
//       Password: createPassword ? createPassword : this.state.Password,
//       Email: createEmail ? createEmail : this.state.Email,
//       Birthday: createwBirthday ? createBirthday : this.state.Birthday
//     },
//   })
//   .then((response) => {
//     localStorage.setItem('user', this.state.Username);
//     console.log(`${username} was updated`);
//     alert('your profile is successfully updated');
//       window.open(`/client/users/${username}`, '_self');
//       })
//       .catch((e) => { 
//        console.log('Error Updating User profile');
//       })
//    } 
//    setUsername(input) {
//     this.Username = input;
//   }
//   setPassword(input) {
//     this.Password = input;
//   }
//   setEmail(input) {
//     this.Email = input;
//   }
//   setBirthday(input) {
//     this.Birthday = input;
//   }


//DELETE requests for deregistering
handleDeleteUser = (e) => {
  e.preventDefault();

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios.delete(`https://myflix-movie.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log(`${username} was deleted`);
      alert('your profile is successfully deleted');
      window.open('/', '_self');
      })
      .catch((e) => { 
       console.log('Error deleting User profile');
     });
   };



   render() {
     const { movies } = this.props;

     return (
       <Container className="profile-container">
           <Card className="border-success text-white bg-secondary mb-3" style={{ width: '20rem'}}>
              <Card.Header> My Flix Profile </Card.Header>
                <Card.Body>
                  <Card.Text>Username: {this.state.Username}</Card.Text>
                  <Card.Text>Password: xxxxxx </Card.Text>
                  <Card.Text>Email: {this.state.Email}</Card.Text>
                  <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
                  <Card.Text>Favorite Movies: {this.state.Favorites }</Card.Text> 
                    <div className="my-favorites"></div>

                     <div className="buttons-back-remove"></div>
                     <br/>
                     <Button variant="danger" className="delete-user" size="sm" onClick={(e) => this.handleDeleteUser(e)}> Delete Profile </Button>
                </Card.Body>
              </Card>
              <Link to={`/`}>
                             <Button variant="warning">Back to Movies</Button>
                          </Link>
          </Container>
      );
   }
  }


{/* 
//  <ButtonGroup size="lg">
//   <Link to={`/user/update`}>
//   <Button variant="success"  className="update-user" onClick={handleProfileUpdate}>Update Profile</Button>
// onClick={(e) => this.handleDeleteUser(e)}
//   <Button variant="success" type="submit" className="delete-user" onClick={handleDeleteUser}> Delete Profile </Button>
// </Link>
// </ButtonGroup>
  */}

  // // UPDATE or PUT requests for User profile
// handleProfileUpdate = (e, createUsername, createPassword, createEmail, createBirthday) => {
//   e.preventDefault();

//   const username = localStorage.getItem('user');
//   const token = localStorage.getItem('token');

//   axios.put(`https://myflix-movie.herokuapp.com/users/${username}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     data: {
//       Username: createUsername ? createwUsername : this.state.Username,
//       Password: createPassword ? createPassword : this.state.Password,
//       Email: createEmail ? createEmail : this.state.Email,
//       Birthday: createwBirthday ? createBirthday : this.state.Birthday
//     },
//   })
//   .then((response) => {
//     localStorage.setItem('user', this.state.Username);
//     console.log(`${username} was updated`);
//     alert('your profile is successfully updated');
//       window.open(`/client/users/${username}`, '_self');
//       })
//       .catch((e) => { 
//        console.log('Error Updating User profile');
//       })
//    } 
//    setUsername(input) {
//     this.Username = input;
//   }
//   setPassword(input) {
//     this.Password = input;
//   }
//   setEmail(input) {
//     this.Email = input;
//   }
//   setBirthday(input) {
//     this.Birthday = input;
//   }



// // // REMOVE favorite movie from User profile
// // handleRemoveFavorite = (e, movie) => {
// //   e.preventDefault();

// //   const username = localStorage.getItem('user');
// //   const token = localStorage.getItem('token');
// //   axios.delete(`https://myflix-movie.herokuapp.com/users/${username}`, {
// //     headers: { Authorization: `Bearer ${token}` }
// //   })
// //     .then((response) => {
// //       console.log(`${movie.Title} was removed from Favorites`);
// //       window.open('_self');
// //     })
// //     .catch((e) => { 
// //       console.log(err)
// //     });
// //   }; 
