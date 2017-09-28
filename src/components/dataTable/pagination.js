import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  fetchAssociations,
  setCurrentPage
} from '../../actions/disease.js';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  handlePageChange(page){
    this.props.dispatch(setCurrentPage(page));
    this.props.dispatch(fetchAssociations(this.props.id, this.props.currentPage, this.props.perPageSize));
  }

  render(){

    const { currentPage, totalPages, } = this.props;

    const buttonGroupInstance = (
      <ButtonToolbar>
        <ButtonGroup>
          <Button disabled={currentPage===0} onClick={() => this.handlePageChange(currentPage-1)} >{'<'}</Button>
          <Button disabled={currentPage===totalPages-1} onClick={() => this.handlePageChange(currentPage+1)} >{'>'}</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );

    return(
      <div>
        {buttonGroupInstance}
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  dispatch: PropTypes.func,
  id: PropTypes.string,
  perPageSize: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pagination;
