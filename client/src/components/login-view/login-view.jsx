import React, { useState } from 'react';
//import Axios from 'axios';

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
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </label>                    
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    );
   }
