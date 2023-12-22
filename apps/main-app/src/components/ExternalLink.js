import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import style from './style.scss';



const ExternalLink = ({children, className, href, id, title, ...rest}) => {
  return (
      <a
        className={className}
        href={href || null}
        id={id}
        rel="noopener noreferrer"
        target="_blank"
        title={title}
        {...rest}
      >
        {children || href}
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={`${style.externalLink} ${className ? style.className : ''}`}/>
      </a>
  );
};

ExternalLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default ExternalLink;
