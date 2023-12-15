import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import style from './style.scss';

const SocialMedia = ({showText = false}) => {
  return (
    <div className={style.socialLinks}>
      <a href='https://www.facebook.com/AllianceOfGenomeResources'>
        <FontAwesomeIcon icon={faFacebookF} fixedWidth /> {showText && 'Facebook'}
      </a>
      <a href='https://twitter.com/alliancegenome'>
        <FontAwesomeIcon icon={faXTwitter} fixedWidth /> {showText && 'Twitter'}
      </a>
      <a href='https://github.com/alliance-genome'>
        <FontAwesomeIcon icon={faGithub} fixedWidth /> {showText && 'Github'}
      </a>
    </div>
  );
};

SocialMedia.propTypes = {
  showText: PropTypes.bool,
};

export default SocialMedia;
