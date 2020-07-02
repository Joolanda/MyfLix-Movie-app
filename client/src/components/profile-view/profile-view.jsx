import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, Form } from 'react-bootstrap';

export class ProfileView extends React.Component {

constructor(props) {
  super(props);
    this.state = {
      username: null,
      password: null,
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
    axios.get('https://myflix-movie.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
    then(response => {
      this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.BirthDate,
          FavoriteMovies: response.data.FavoriteMovies
        });

      })
       .catch(e => {
       console.log(error);
     });
   }
// Task: 
// Authenticated users of myFlix:
// will also want to make GET for viewing their profile:

// and PUT requests for updating their profile
handleProfileUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
  e.preventDefault();

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios.put('https://myflix-movie.herokuapp.com/users/${username}', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      Username: newUsername ? newUsername : this.state.Username
      Password: newPassword ? newPassword : this.state.Password
      Email: newEmail ? newEmail : this.state.Email
      Birthday: newBirthday ? this.state.Birthday
    },
  })
  then((response) => {
    localStorage.setItem('user', this.Username);
    console.log(`${username} was updated`);
    alert('your profile is successfully updated');
      window.open('/', '_self');
      })
       .catch(e => {
       console.log('Error Updating User profile');
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
}

//DELETE requests for deregistering
handleDeregister(e, user) {
  e.preventDefault();

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  axios.
    delete('https://myflix-movie.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
    then((response) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log(`${username} was deleted`);
      alert('your profile is successfully deleted');
      window.open('/', '_self');
      })
       .catch(e => {
       console.log('Error deleting User profile');
     });
   }

   render() {
     const { username, password, email, birthday, favoriteMovies } =this.state
     const { movies } = this.props;
     
     return (
       <div>
         <Container className="profile-view">
           <h1>My Flix Profile</h1>
           <br/>
           <Card>
             <Card.Body>
               <Card.Text>Username: {username}</Card.Text>
               <Card.Text>Password: xxxxxx </Card.Text>
               <Card.Text>Email: {email}</Card.Text>
               <Card.Text>Birthday: {birthday}</Card.Text>
               <Card.Text>Favorite Movies: {birthday}</Card.Text>
                <div className="my-favorites"></div>
                <div className="buttons-back-remove"></div>
                <br/>
                <br/>
                <Link>
                  <Button classname="remove-user" onClick={(e) => this.handleDeregister(e)}> Delete Profile </Button>
                </Link>
             </Card.Body>
           </Card>
         </Container>
       </div>
     );
   }
  }

