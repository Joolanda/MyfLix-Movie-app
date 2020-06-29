import React, { useState } from 'react';
import './login-view.scss';
import axios from 'axios';

// bootstrap imports
import { Row, Col, Button, Form, Container} from 'react-bootstrap';

export function LoginView (props) {
const [ username, setUsername ] = useState('');
const [ password, setPassword ] = useState('');

// const handleSubmit = (e) => {
//   console.log(username, password);
//   /* Send a request to the server for authentication */
//   /* then call props.onLoggedIn(username) */
//   props.onLoggedIn(username);
//   };

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


    return (
      <Container className="login-view">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} className="form-container">
            <Form className="login-container">
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
            </Form>
          </Col>
        </Row>
      </Container>
    );
   }

   //LoginView.propTypes = {
  // onLoggedIn: PropTypes.func.isRequired
  //};