import React from 'react';
import style from './style.module.scss';
import PropTypes from 'prop-types';
import ExternalLink from '../../components/ExternalLink';

const VisitMod = ({modVisitButtonText, linkToMod, sectionStyle}) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div data-testid="visit_mod-inner-container" className={`${style.section} ${sectionStyle}`}>
        <h2 data-testid="visit_mod_header" className={style.sectionTitle}>
          <ExternalLink data-testid={'visit_mod_link'} href={linkToMod}>Visit {modVisitButtonText}</ExternalLink>
        </h2>
{/*         <ExternalLink data-testid={'visit_mod_link'} href={linkToMod}>
          <span data-testid="visit_mod_header" className={style.sectionTitle}>
            Visit {modVisitButtonText}
          </span>
        </ExternalLink>
  */}     </div>
    </div>
  );
}

VisitMod.propTypes = {
  modVisitButtonText: PropTypes.string.isRequired,
  linkToMod: PropTypes.string.isRequired
}

export default VisitMod;
