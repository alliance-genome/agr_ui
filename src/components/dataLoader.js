import React from 'react';
import PropTypes from 'prop-types';
import DataProvider from './dataProvider';
import NoData from './noData';

export default class DataLoader extends React.Component {

  render() {
    const {children, url} = this.props;
    return (
      <DataProvider url={url}>
        {
          ({data, error, status}) => (
            status === 'SUCCESS' ? data ? children({data: data}) : <NoData /> :
            status === 'ERROR' ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) :
            status === 'LOADING' ? 'Loading...' :
            null
          )
        }
      </DataProvider>
    );
  }
}

DataLoader.propTypes = {
  children: PropTypes.any,
  url: PropTypes.any,
};
