import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

    // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default

  componentDidMount() {
    axios.get('https://myflix-movie.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
     { movies.map(movie => (
       <div className="movie-card" key={movie._id}>{movie.Title}</div>
     ))}
     </div>
    );
  }
}
