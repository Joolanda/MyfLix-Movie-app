import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./director-view.scss";

// bootstrap import
import { Card, Button, Container } from 'react-bootstrap';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, Director } = this.props;

    if (!Director) return null;

    return (
      <div className="director-view">
        <Card className="director-card">
          <Card.Body classname="director-body">
            <Card.Title className="director-name">{movie.Director.Name}</Card.Title>
            <Card.Text>Director Bio: {movie.Director.Bio}</Card.Text>
            <Card.Text>Birth Year: {movie.Director.Birth}</Card.Text>
            <Link to={`/`}>
              <Button variant="link">Back to movies</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genres</Button>
          </Link>
          </Card.Body>
        </Card>
    </div>
    );   
  }
}

// DirectorView.propTypes = {
//   Director: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Bio: PropTypes.string.isRequired
//   }).isRequired
// };
