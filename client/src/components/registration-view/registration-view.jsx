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
        <Form.Label>Username:</Form.Label>
        <Form.Control size="sm" type="text" placeholder="username" value={username} onChange={e => createUsername(e.target.value)}/>
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>   
      <Form.Group controlId="formBasicPassword">              
        <Form.Label>Password:</Form.Label> 
        <Form.Control size="sm" type="password" placeholder="password" value={password} onChange={e => createPassword(e.target.value)}/>
        </Form.Group>  
      <Form.Group controlId="formBasicEmail">              
        <Form.Label> Email: </Form.Label>
        <Form.Control size="sm" type="email" placeholder="watch out for typos" value={email} onChange={e => createPassword(e.target.value)} />
        <Form-Text className="text-muted">
          We'll never share your email with anyone else.
        </Form-Text>
      </Form.Group>  
      <Form.Group controlId="formBasicBirthday">              
        <Form.Label>Birthday:</Form.Label> 
        <Form.Control size="sm" type="birthday" placeholder="1990-05-12" value={birthday} onChange={e => createBirthday(e.target.value)}/>
      </Form.Group>  
      <Button variant="success" type="submit" size="sm"  onClick={handleSubmit}>Register</Button>
    </Form>
  );
 }

