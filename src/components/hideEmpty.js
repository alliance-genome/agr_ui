import React, { PropTypes } from 'react';

const hasContent = (data) => {
  if (typeof(data) !== 'object') {
    // data is primitives primitives
    return data || data === 0;
  } else if (Array.isArray(data)) {
    return data.length;
  } else {
    return Object.keys(data).length;
  }
};

const hideEmpty = (WrappedComponent) => {
  const Wrapper = (props) => {
    const componentHasContent =
      (props.hasContentFunc && props.hasContentFunc(props)) ||
      hasContent(props.data);
    return componentHasContent ? <WrappedComponent {...props} /> :
      <div className="alert alert-warning">Data Unavailable</div>;
  };

  Wrapper.propTypes = {
    data: PropTypes.any,
    hasContentFunc: PropTypes.func,
  };

  return Wrapper;
};

export default hideEmpty;
