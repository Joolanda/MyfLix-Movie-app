import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./genre-view.scss";

// bootstrap import
import { Card, Button, Container } from 'react-bootstrap';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { movie, Genre } = this.props;

    if (!movie) return null;

    return (
        <Container className="genre-view">
        <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{width:'20rem'}}>
        <Card.Body>
          <Card.Title>{movie.Genre.Name}</Card.Title>
          <Card.Text>{Genre.Description}</Card.Text>
          <Card.Text>All movies with this genre: </Card.Text>
          <Link to={`/`}>
            <Button variant="link">Back to Movies</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </Card.Body>
      </Card>
      </Container>
  );
}
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  })
};
