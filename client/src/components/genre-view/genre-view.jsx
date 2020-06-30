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
    const { movie, genre } = this.props;

    if(!genre) return null;

    return (
      <div className="genre-view">
      <Container>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text>Description: {genre.Description}</Card.Text>
            <Link to={`/`}>
              <Button variant="link">Back to movies</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
    );   
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string
  })
};
