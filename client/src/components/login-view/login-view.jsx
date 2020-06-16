import React, { useState } from 'react';
import './login-view.scss';
import axios from 'axios';
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

// const handleSubmit = (e) => {
//   e.preventDefault();
//   /* Send a request to the server for authentication */
//   axios.
//     post('https://myflix-movie.herokuapp.com/login', {
//       Username: username,
//       Password: password
//     })
//     .then((response) => {
//     const data = response.data;
//       props.onLoggedIn(data);
//     })
//     .catch((e) => { 
//     console.log('no such user');
//     });
//   }; 


    return (
 
      <Form className="login-container">
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
        </Form.Group>  
        <Button variant="success" type="submit" size="sm"  onClick={handleSubmit}>Login</Button> 
      </Form>
    );
   }
