import React from 'react';
import PropTypes from 'prop-types';
import fetchData from '../lib/fetchData';
import makeCancelable from '../lib/makeCancelable';

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

  componentWillUnmount() {
    // to avoid “setState warning” on unmounted component
    // refer to https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this.cancelableFetch && this.cancelableFetch.cancel();
  }

  fetchData() {
    const { url, fetchOptions } = this.props;
    // eslint-disable-next-line
    this.setState({
      status: status.LOADING,
      data: null,
      error: null,
    }, () => {
      this.cancelableFetch = makeCancelable(fetchData(url, fetchOptions));
      this.cancelableFetch.promise.then(
        // eslint-disable-next-line
        (data) => this.setState({
          status: status.SUCCESS,
          data: data,
        })
      ).catch(
        // eslint-disable-next-line
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
  children: PropTypes.func.isRequired,
  fetchOptions: PropTypes.object,
  url: PropTypes.string.isRequired,
};
