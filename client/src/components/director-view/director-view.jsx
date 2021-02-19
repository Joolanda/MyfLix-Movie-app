import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./director-view.scss";

// bootstrap import
import { Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {

    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Card className="border-success text-white bg-info mb-3" style={{ width: '20rem'}}>
        <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title className="director-name">{director.Name}</Card.Title>
            <Card.Text>Director Bio: <br/>{director.Bio}</Card.Text>
            <Card.Text>Birth Year: {director.Birth}</Card.Text>
            <Link to={`/`}>
              <Button variant="dark">Back to movies</Button>
            </Link>
          </Card.Body>
        </Card>
    </div>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};
