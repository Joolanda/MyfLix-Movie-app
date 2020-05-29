import React, { useState } from 'react';
//import Axios from 'axios';

export function RegistrationView (props) {
const [ username, createUsername ] = useState('');
const [ password, createPassword ] = useState('');
const [ email, createEmail ] = useState('');
const [ birthday, createBirthday] = useState('');

const handleRegistration = (e) => {
  console.log(username, password);
  /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */
  props.onLoggedIn(username);
  };

//const handleRegister = (e) => {
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
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => createUsername(e.target.value)}/>
        </label>                    
        <label>
          Password:
          <input type="password" value={password} onChange={e => createPassword(e.target.value)}/>
        </label>
        <button type="button" onClick={handleSRegister}>Register</button>
      </form>
    );
   }
