import React from 'react';
import PropTypes from 'prop-types';
import parse, {domToReact} from 'html-react-parser';
import {HashLink} from 'react-router-hash-link';
import {Link} from 'react-router-dom';

const ReplaceLinks = ({html}) => parse(html, {
  replace: node => {
    if (node.name === 'a' && node.attribs.href) {
      if (node.attribs.href.charAt(0) === '#') {
        return <HashLink to={node.attribs.href}>{domToReact(node.children)}</HashLink>;
      }
      if (node.attribs.href.charAt(0) === '/' && (!node.attribs.target || node.attribs.target === '_self')) {
        return <Link to={node.attribs.href}>{domToReact(node.children)}</Link>;
      }
    }
  }
});

ReplaceLinks.propTypes = {
  html: PropTypes.string,
};

export default ReplaceLinks;
