import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
import axios from 'axios';
import { Link } from "react-router-dom";

// bootstrap imports
import { Row, Col, Button, Form, Container} from 'react-bootstrap';

export function LoginView (props) {
const [ username, setUsername ] = useState('');
const [ password, setPassword ] = useState('');
const [ email, setEmail ] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  /* Send a request to the server for authentication */
  axios.
    post('https://myflix-movie.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then((response) => {
    const data = response.data;
      props.onLoggedIn(data);
    })
    .catch((e) => { 
    console.log('no such user here');
    });
  }; 

 
const handleNewUser = (e) => {
  // check this new code to handle click event for new users to open registration view.
  // new users who want to register, should not have to login first..add or rewrite code to fix this issue 
   e.preventDefault();
  window.open('/register', '_self');

  };
 

    return (
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} className="form-container">
            <Form className="login-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>  
                <Form.Control 
                  size="sm" 
                  type="username" 
                  placeholder="enter your login userID" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)}/>
              <Form.Text className="text-muted"></Form.Text>
             </Form.Group>   
             <Form.Group controlId="formBasicPassword">              
              <Form.Label>Password:</Form.Label> 
              <Form.Control size="sm" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group> 
               <Button variant="btn-lg btn-success btn-block" type="submit" size="sm"  onClick={handleSubmit}>
                 Login
                </Button>					       
                <Button variant="btn-lg btn-success btn-block" btn-block btn-block type="submit"  size="sm" onClick={handleNewUser}>
					        You don't have an acount? Click here
					      </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
   }

  //  <a href={`/register`}>
  //  <Button variant="btn-lg btn-success btn-block" btn-block type="link" size="sm" >
  //   You don't have an acount? Click here
  // </Button>
  // </a>

  // LoginView.propTypes = {
  //   username: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  //   onClick: PropTypes.func.isRequired
  // };