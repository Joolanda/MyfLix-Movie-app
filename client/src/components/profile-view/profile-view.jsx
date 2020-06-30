import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, Form } from 'react-bootstrap';

export class Profileview extends React.Component {

constructor(props) {
  super(props);
    this.state = {
      username: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    }
  }
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    letusername = localStorage.getItem('token')
    axios.('https://myflix-movie.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
    then(response => {
      this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthdate: response.data.BirthDate,
          favoriteMovies: response.data.FavoriteMovies
        });

      })
       .catch(function (error) {
       console.log(error);
     });
   }
// Task: 
// Authenticated users of myFlix:
// will also want to make GET for viewing their profile,
// and PUT requests for updating their profile, 
//POST requests for registering new users, and 
//DELETE requests for deregistering
   render()

  }
}