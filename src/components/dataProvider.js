import React from 'react';
import PropTypes from 'prop-types';
import fetchData from '../lib/fetchData';

const status = {
  STARTING: 'STARTING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      status: status.STARTING,
    };
  }

  componentDidMount () {
    this.fetchData();
  }

  componentDidUpdate (prevProps) {
    const { url, fetchOptions } = this.props;
    if (url !== prevProps.url || fetchOptions !== prevProps.fetchOptions) {
      this.fetchData();
    }
  }

  fetchData() {
    const { url, fetchOptions } = this.props;
    this.setState({
      status: status.LOADING,
      data: null,
      error: null,
    }, () => {
      fetchData(url, fetchOptions).then(
        (data) => this.setState({
          status: status.SUCCESS,
          data: data,
        })
      ).catch(
        (error) => this.setState({
          status: status.ERROR,
          error: error,
        })
      );
    });
  }

  render() {
    const {status, data, error} = this.state;
    return this.props.children({
      status: status,
      data: data,
      error: error,
    });
  }
}

DataProvider.propTypes = {
  url: PropTypes.string.isRequired,
  fetchOptions: PropTypes.object,
};
