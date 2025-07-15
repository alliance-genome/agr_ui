import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTotal } from '../../selectors/searchSelectors';
import style from './style.module.scss';
import { selectPageLoading } from '../../selectors/loadingSelector';

const TotalCount = ({ isPending, total }) => {
  if (isPending) {
    return <span className={style.totalPending} />;
  }
  return <span>{total.toLocaleString()}</span>;
};

TotalCount.propTypes = {
  isPending: PropTypes.bool,
  total: PropTypes.number,
};

const mapStateToProps = (state) => ({
  isPending: selectPageLoading(state),
  total: selectTotal(state),
});

export default connect(mapStateToProps)(TotalCount);
