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
    const { movie, Genre } = this.props;

    if (!Genre) return null;

    return (
        <div className="genre-view">
        <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{width:'20rem'}}>
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>{movie.Genre.Name}</Card.Title>
          <Card.Text>{movie.Genre.Description}</Card.Text>
          <Card.Text>All movies with this genre: </Card.Text>
          <Link to={`/`}>
            <Button variant="link">Back to Movies</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </Card.Body>
      </Card>
      </div>
  );
}
}

// return (      
//   <div className="movie-view">
//    <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{width:'20rem'}}>
//     <Card.Header>
//       <Card.Img variant="top" className="movie-view-image" src={movie.ImagePath} />
//     </Card.Header>
//     <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Card.Text>Description: {movie.Description}</Card.Text>
//         <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
//         <Card.Text>Director: {movie.Director.Name}</Card.Text>
//         <ButtonGroup vertical>
//         <Link to={`/`}>
//           <Button variant="secondary">Back to Movies</Button>
//         </Link>
//         <Link to={`/directors/${movie.Director.Name}`}>
//           <Button variant="secondary">Show more of {movie.Director.Name}
//             {' '}</Button>
//         </Link>
//         <Link to={`/genres/${movie.Genre.Name}`}>
//           <Button variant="secondary">More of {movie.Genre.Name} genre</Button>
          
//         </Link>
//         </ButtonGroup>
//       </Card.Body>
//     </Card>
//   </div>
// );
// }
// }


GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  })
};
