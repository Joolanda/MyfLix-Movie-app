import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  constructor() {
    super();  

    this.state = {};
}

  render() {
   const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
       <div className="movie-title">
         <h2 className="value">{movie.Title}</h2>
       </div>
        <img className="movie-poster" src={movie.ImagePath} />

        <div className="movie-description">
           <span className="label">Description: </span>
          <span className="value">{movie.Description} </span>
        </div>
  
        <div className="movie-genre">
         <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
       <Button className="reset-button" variant="secondary" onClick={() => this.props.onResetSelectedMovie()}>Back</Button>
     </div>
    );
  }
  }

  MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,}).isRequired, 
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };