import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Link } from "react-router-dom";

// bootstrap import
import { Button, Card, CardGroup, Nav, NavBar } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <CardGroup>
          <Card className="border-success text-white bg-dark mb-3" style={{ width: '20rem' }}>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Header> <h2>{movie.Title}</h2></Card.Header>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="success" size="lg" btn-block="true" >Tell me more</Button>
              </Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

// props because it will need to display information about the specific movie it’s hosting.
// These props will be the movie image path, the movie title, and the movie description.
MovieCard.propTypes = {

  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
