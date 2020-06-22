import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
        <Card className="border-success text-white bg-dark mb-3" style={{ width: '18rem'}}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Header>
              <h2>{movie.Title}</h2></Card.Header>
             <Card.Text>{movie.Description}</Card.Text>
            </Card.Body>
              <Button onClick={() => onClick(movie)} variant="success">
                Tell me more
               </Button>
        </Card>


//      <div 
//      onClick={() => onClick(movie)} 
//      className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};