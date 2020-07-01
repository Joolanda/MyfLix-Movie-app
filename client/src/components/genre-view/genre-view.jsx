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

    if (!movie) return null;

    return (
      <div className="genre-view">

        <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{width:'20rem'}}>
          <Card.Body>
            <Card.Title>{movie.genre.Name}</Card.Title>
            <Card.Text>Description: {movie.genre.Description}</Card.Text>
            <Link to={`/`}>
              <Button variant="link">Back to movies</Button>
            </Link>
          </Card.Body>
        </Card>
 
    </div>
    );   
  }
}

// GenreView.propTypes = {
//   genres: PropTypes.shape({
//     Name: PropTypes.string,
//     Description: PropTypes.string
//   })
// };
