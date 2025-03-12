import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faMastodon, faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons';
import style from './style.module.scss';

// This component may not be used anywhere now that it is no longer called by the Footer component.

const SocialMedia = ({showText = false}) => {
  return (
    <div className={style.socialLinks}>
      <a href='https://www.facebook.com/AllianceOfGenomeResources'>
        <FontAwesomeIcon icon={faFacebookF} fixedWidth /> {showText && 'Facebook'}
      </a>
      <a href='https://genomic.social/@AllianceGenome'>
        <FontAwesomeIcon icon={faMastodon} fixedWidth /> {showText && 'Mastodon'}
      </a>
      <a href='https://bsky.app/profile/alliancegenome.bsky.social'>
        <FontAwesomeIcon icon={faBluesky} fixedWidth /> {showText && 'Bluesky'}
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
