import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

// bootstrap import
import { Row, Col, Button,Card, CardDeck } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div className="movie-card">
        <CardDeck>
          <Card className="border-success text-white bg-dark mb-3" style={{ width: '20rem'}}>
            <Card.Img variant="top" src={movie.ImagePath} />
           <Card.Body>
             <Card.Header> <h2>{movie.Title}</h2></Card.Header>
             <Card.Text>{movie.Description}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Button onClick={() => onClick(movie)} variant="success" size="lg" block>
                Tell me more
               </Button>
             </Card.Body>
          </Card>
         </CardDeck>
       </div> 
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