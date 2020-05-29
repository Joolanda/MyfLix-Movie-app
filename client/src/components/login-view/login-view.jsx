import React, { useState } from 'react';

export function LoginView (props) {
const [ username, setUsername ] = usestate('');
const [ password, setPassword ] = useState('');


const handleSubmit = () => {
  console.log(username, password);
  /*send a request to the sever fo authentication */
  /* then call this.props.onLoggedIn(username) */
  };


    return (
      <form>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.onUsernameChange}/>
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.onPasswordchange}/>
        </label>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
    }
  