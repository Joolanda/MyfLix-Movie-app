import React from 'react';
import axios from 'axios';

class MainView extends React.component {
  constructor () {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {};
  }
  // THis overrides the render() method of the superclass
  // No need to call super() though, as it does not hing by default
  render() {
    return (
      <div className="main-view"></div>
      );
  }
}