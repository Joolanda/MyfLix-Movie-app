import React, { useCallback } from 'react';

export class MovieView extends React.Component {

  constructor() {
    super();
  

    this.state = {};
  }
  //onResetSelectedMovie = () => this.props.onClick()

  render() {
   const { movie } = this.props;
  
    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
         <span className="label">Title: </span>
         <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-desription">
           <span className="label">Decription: </span>
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
       <button variant="primary" classname="back-button" onClick={() => this.onResetSelectedMovie}>Back</button>
     </div>
    );
  }
  }
