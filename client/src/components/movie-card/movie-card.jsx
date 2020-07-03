import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Link } from "react-router-dom";

// bootstrap import
import { Button,Card, CardGroup, Nav, NavBar } from 'react-bootstrap';


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <CardGroup>
          <Card className="border-success text-white bg-dark mb-3" style={{ width: '20rem'}}>
            <Card.Img variant="top" src={movie.ImagePath} />
           <Card.Body>
             <Card.Header> <h2>{movie.Title}</h2></Card.Header>
             <Card.Text>{movie.Description}</Card.Text>
             <Link to={`/movies/${movie._id}`}>
            <Button variant="success" size="lg" block>Tell me more</Button>
          </Link>
            </Card.Body>
          </Card>
         </CardGroup>
       </div> 
//      onClick={() => onClick(movie)} 
//      className="movie-card">{movie.Title}</div>
    );
  }
}


// old code return(), before router Task 3.5
/* <Card.Body>
<Button onClick={() => onClick(movie)} variant="success" size="lg" block>
  Tell me more
 </Button>
 <Button className="sign_out-button" variant="secondary" size="sm" onClick={() => this.onLoggedOut()}>Sign out</Button> 
</Card.Body> */

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };