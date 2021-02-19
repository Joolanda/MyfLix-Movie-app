import React from 'react';
import "./movie-view.scss";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// bootstrap import
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  /**
   * Adds the current movie to the user's favorites list
   * Axios 'post' and 'put' methods: 1. URL 2. data 3. config.
   * @function addFavorite
   * @param {event} buttonClick
   * @param {_id} 
   * @returns {alert} - "Movie added to favorites."
   */

  addFavorite(e, movieID) {
    e.preventDefault();
    console.log();
    // send a request to the server for authentication
    axios.post(`https://myflix-movie.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieID}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    )
      .then((response) => {
        const data = response.data;
        console.log(data); // Check to see how the object looks like!
        alert('added movie to favorites');
        this.props.setFavorites(data.Favorites);
      })
      .catch(e => {
        alert('error updating movies');
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;


    return (
      <div className="movie-view">
        <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{ width: '20rem' }}>
          <Card.Header>
            <Card.Img variant="top" className="movie-view-image" src={movie.ImagePath} />
          </Card.Header>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            {/*  path="/users/:Username/movies/:_Id" */}
            <Button variant="warning" onClick={(e) => { this.addFavorite(e, movie._id) }}>Add to my favorites!
               </Button>
            <Card.Text>Description: {movie.Description}</Card.Text>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
            <ButtonGroup size="lg">
              <Link to={`/`}>
                <Button variant="dark">Back to Movies</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="info" href="/genres/${movie.Genre.Name}"> More {movie.Genre.Name}</Button>
              </Link>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="info" href="/directors/${movie.Director.Name}"> Bio of {movie.Director.Name}
                </Button>
              </Link>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
  favorites: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  setFavorites: PropTypes.func.isRequired
};

