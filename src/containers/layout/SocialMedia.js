import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

const SocialMedia = ({showText = false}) => {
  return (
    <div className={style.socialLinks}>
      <a href='https://www.facebook.com/AllianceOfGenomeResources'>
        <i className='fa fa-fw fa-facebook'/> {showText && 'Facebook'}
      </a>
      <a href='https://twitter.com/alliancegenome'>
        <i className='fa fa-fw fa-twitter'/> {showText && 'Twitter'}
      </a>
      <a href='https://github.com/alliance-genome'>
        <i className='fa fa-fw fa-github'/> {showText && 'Github'}
      </a>
    </div>
  );
};

SocialMedia.propTypes = {
  showText: PropTypes.bool,
};

export default SocialMedia;
