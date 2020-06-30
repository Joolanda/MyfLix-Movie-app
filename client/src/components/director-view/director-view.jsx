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
    const { movies, director } = this.props;

    if(!director) return null;

    return (
      <div className="director-view">
      <Container>
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Director Bio: {director.Bio}</Card.Text>
            <Card.Text>Birth Year: {director.Birth}</Card.Text>
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
