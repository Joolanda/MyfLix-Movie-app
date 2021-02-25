import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';
import { Col } from 'react-bootstrap';

function VisibilityFilterInput(props) {
  return (
    <div className="filter">
      <Form.Control
        size='lg'
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
      />
      ;
    </div>
  );
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);