/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import { makeId } from '../lib/utils';

import NoData from './noData.jsx';
import ErrorBoundary from './errorBoundary.jsx';
import HelpPopup from './helpPopup.jsx';

const Subsection = ({ children, hardcoded, hasData, help, hideTitle = false, isMeta, level, title }) => {
  const id = title && makeId(title);
  const Target = () => <a className={style.target} id={id} />;
  const helpPopup = help && (
    <span className="small ml-3">
      <HelpPopup id={`help-${title}`}>{help}</HelpPopup>
    </span>
  );

  let renderTitle;
  const titleContent = (
    <>
      {isMeta && <target />}
      {title}
      {helpPopup}
    </>
  );
  switch (level) {
    case 1:
      renderTitle = <h4 className="text-break">{titleContent}</h4>;
      break;
    case 2:
      renderTitle = <h5>{titleContent}</h5>;
      break;
    default:
      renderTitle = <h3>{titleContent}</h3>;
  }

  return (
    <div className={style.subsection}>
      {!isMeta && <Target />}
      {hardcoded && <span className="badge badge-danger">Hardcoded Example Data</span>}
      {title && !hideTitle && renderTitle}
      {typeof hasData !== 'undefined' && !hasData ? <NoData /> : <ErrorBoundary>{children}</ErrorBoundary>}
    </div>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  hardcoded: PropTypes.bool,
  hasData: PropTypes.bool,
  help: PropTypes.node,
  hideTitle: PropTypes.bool,
  isMeta: PropTypes.bool,
  level: PropTypes.number,
  title: PropTypes.string,
};

export default Subsection;
