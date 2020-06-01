import React, { useState } from 'react';
import './login-view.scss';
//import Axios from 'axios';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


export function LoginView (props) {
const [ username, setUsername ] = useState('');
const [ password, setPassword ] = useState('');

const handleSubmit = (e) => {
  console.log(username, password);
  /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */
  props.onLoggedIn(username);
  };

//const handleSubmit = (e) => {
//  e.preventDefault();
  // Send a request to the server for authentication
//  axios.post('https://myflix-movie.herokuapp.com/login', {
//    Username: username,
//    Password: password
//  })
//  .then((response) => {
//  const data = response.data;
//    props.onLoggedIn(data);
//  })
//  .catch((e) => { 
//  console.log('no such user');
//  });
// Send a request to the server for authentication then call props.onLoggedIn(username)
// props.onLoggedIn(username);
//};


    return (
      <Container classname="login-container">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:
           <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
          </Form.Label>  
          </Form.Group>   
        <Form.Group controlId="formBasicPassword">              
        <Form.Label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
         </Form.Label> 
        <Button variant="success" type="submit" size="sm"  onClick={handleSubmit}>Submit</Button>
        </Form.Group>  
      </Form>
      </Container>
    );
   }
