import React, { useState } from 'react';
import './registration-view.scss';
//import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export function RegistrationView (props) {
const [ username, createUsername ] = useState('');
const [ password, createPassword ] = useState('');
const [ email, createEmail ] = useState('');
const [ birthday, createBirthday] = useState('');

const handleSubmit= (e) => {
  console.log(username, password);
  /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */
  props.onLoggedIn(username);
  };

//const handleSubmit = (e) => {
//  e.preventDefault();
//  axios.post('https://myflix-movie.herokuapp.com/login', {
//    Username: username,
//    Password: password,
//    Email: email,
//    Birthday: birthday
//  })
//  .then((response) => {
//  const data = response.data;
//   console.log(data);
//  })
//  .catch((e) => { 
//  console.log('error user registration');
//  });
// Send a request to the server for authentication then call props.onLoggedIn(username)
// props.onLoggedIn(username);
//};

   return (
  
    <Form classname="register-container">>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:
         <input type="text" value={username} onChange={e => createUsername(e.target.value)}/>
        </Form.Label>  
        </Form.Group>   
      <Form.Group controlId="formBasicPassword">              
      <Form.Label>
        Password:
        <input type="password" value={password} onChange={e => createPassword(e.target.value)}/>
       </Form.Label> 
      </Form.Group>  
      <Form.Group controlId="formBasicEmail">              
      <Form.Label>
        Email:
        <input type="email" value={email} onChange={e => createPassword(e.target.value)}/>
       </Form.Label> 
      </Form.Group>  
      <Form.Group controlId="formBasicBirthday">              
      <Form.Label>
        Birthday:
        <input type="birthday" value={birthday} onChange={e => createBirthday(e.target.value)}/>
       </Form.Label> 
      </Form.Group>  
      <Button variant="success" type="submit" size="sm"  onClick={handleSubmit}>Register</Button>
    </Form>
  );
 }
