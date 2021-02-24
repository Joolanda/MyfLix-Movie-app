import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};
/**
  * Allows users to filter the list of movies
  * @function MoviesList
  * @Param {*} props
  */
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Row className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => (
        <Col key={m._id} xs={12} sm={6} md={4} lg={4}>
          <MovieCard key={m._id} movie={m} />
        </Col>
      ))}
    </Row>
  );
}

export default connect(mapStateToProps)(MoviesList);
