import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

const ExternalLink = ({children, className, href, id, title, ...rest}) => {
  if (href) {
    className = (className || '') + (' ' + style.externalLink);
  }
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
