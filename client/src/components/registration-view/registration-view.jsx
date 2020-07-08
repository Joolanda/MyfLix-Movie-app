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

if (user) return null;

const handleRegister = (e) => {
  e.preventDefault();

  axios.post('https://myflix-movie.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
  })
  .then(response => {
  const data = response.data;
   console.log(data);
   window.open('/client', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => { 
  console.log('error user registration');
  });
};


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
        <Form.Control size="sm" type="email" placeholder="watch out for typos" value={email} onChange={e => createEmail(e.target.value)} />
        <Form-Text className="text-muted">
          We'll never share your email with anyone else.
        </Form-Text>
      </Form.Group>  
      <Button variant="success" type="submit" size="sm"  onClick={handleRegister}>Register</Button>
    </Form>
  );
 }

 //RegistrationView.propTypes = {
  // no props so far
//};