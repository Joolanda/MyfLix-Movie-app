import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import axios from 'axios';
import { Link } from "react-router-dom";


// bootstrap imports
import { Button, Form, Container} from 'react-bootstrap';

export function RegistrationView (props) {
const [ newUsername, setNewUsername ] = useState('');
const [ newPassword, setNewPassword ] = useState('');
const [ newEmail, setNewEmail ] = useState('');

if (user) return null;

const handleRegister = (e) => {
  e.preventDefault();

  axios.post('https://myflix-movie.herokuapp.com/users', {
    Username: newUsername,
    Password: newPassword,
    Email: newEmail,
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

// const cancelRegister = () => {
//   window.open('/client', '_self');
// };
   return (
  
    <Form classname="register-container">>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control size="sm" type="text" placeholder="username" value={username} onChange={e => setNewUsername(e.target.value)}/>
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>   
      <Form.Group controlId="formBasicPassword">              
        <Form.Label>Password:</Form.Label> 
        <Form.Control size="sm" type="password" placeholder="password" value={password} onChange={e => setNewPassword(e.target.value)}/>
        </Form.Group>  
      <Form.Group controlId="formBasicEmail">              
        <Form.Label> Email: </Form.Label>
        <Form.Control size="sm" type="email" placeholder="watch out for typos" value={email} onChange={e => setNewEmail(e.target.value)} />
        <Form-Text className="text-muted">
          We'll never share your email with anyone else.
        </Form-Text>
      </Form.Group>  
      <Button variant="success" type="submit" size="sm"  onClick={handleRegister}>Register</Button>
      <br></br>
    </Form>
  );
 }

 //RegistrationView.propTypes = {
  // no props so far
//};
// RegistrationView.propTypes = {
// 	setNewUsername: PropTypes.string,
//   setNewPassword: PropTypes.string,
//   setNewEmail: PropTypes.string,
// };
//
//    <Button variant="success" type="submit" size="sm"  onClick={cancelRegister}>You already have an account? Click here</Button>