import React, { useCallback } from 'react';
import "./movie-view.scss";
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';

// bootstrap import
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


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
       <Card className="border-dark text-white bg-success mb-3" style={{width:'540px'}}>
          <Row className="no-gutter">
            <Col className="md-4"> 
              <img className="movie-view-image" src={movie.ImagePath} />
            </Col>
          </Row>
        
        <Card.Body>
          <Col className="md-8">
              <div className="movie-title">
                 <h2>{movie.Title}</h2>
               </div>

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
          </Col>
       </Card.Body>
            <Button className="reset-button" variant="secondary" onClick={() => this.props.onResetSelectedMovie()}>Back to Movies</Button>
        </Card>
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