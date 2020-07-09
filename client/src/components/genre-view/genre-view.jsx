import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./genre-view.scss";

// bootstrap import
import { Card, Button, Container } from 'react-bootstrap';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }
  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
        <div className="genre-view">
        <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{width:'20rem'}}>
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title className="genre-name">>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <Card.Text>All movies with this genre: </Card.Text>
          <Link to={`/`}>
            <Button variant="link">Back to Movies</Button>
          </Link>
        </Card.Body>
      </Card>
      </div>
  );
}
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  })
};
