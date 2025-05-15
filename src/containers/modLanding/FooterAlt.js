import style from './style.module.scss';
import PropTypes from "prop-types";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter, faYoutube, faFacebookF, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../../components/ExternalLink';

library.add(faXTwitter, faYoutube, faFacebookF, faLinkedin, faGithub);

const FooterAlt = ({link, links, note, footerStyle, logoImgSrc, titleBarStyle, modShortName}) => {
  return (
      <div className={`${footerStyle} ${style.modFooter}`}>
        <div className={`container ${style.modFooterContainer}`}>
          <div className={`{style.modFooterText} ${titleBarStyle}`}>
            <div className="container-fluid">
              <div className="row">
                <div data-testid={'footer_div'} className="col-med-2 col-md-2 col-lg-2 col-xl-2">
                  <ExternalLink data-testid={'footer_link'} href={link}>
                    <img alt="" data-testid={'footer_hex'} src={logoImgSrc} height="50px" />
                    <span className={style.modFooterLabel}
                      dangerouslySetInnerHTML={{ __html: modShortName }}
                      data-testid={'modname_footer'} />
                  </ExternalLink>
                </div>
                <div className="col-med-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="row">
                    {links && links.map((link, index) => {
                      /*  content.footer is using empty data to create empty "cells" in footer layout;
                          the extLink abstraction lets that convention work with the ExternalLink component
                          displaying non-empty links */
                      let extLink = ( link[1] )
                                  ? <ExternalLink data-testid={'footer_link_' + index} href={link[2]}>
                                      <span data-testid={'footer_label_' + index}>{link[1]}</span>
                                    </ExternalLink>
                                  : <a data-testid={'footer_link_' + index} href={link[2]}>
                                      <span data-testid={'footer_label_' + index} />
                                    </a>
                      return (
                        <div key={index} className="col-med-4 col-md-4 col-lg-4 col-xl-4">
                          {extLink}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {note && <div><p>{note}</p></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

FooterAlt.propTypes = {
  links: PropTypes.array.isRequired,
  note: PropTypes.string,
  footerStyle: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
  titleBarStyle: PropTypes.string.isRequired,
  modShortName: PropTypes.string.isRequired,
}

export default FooterAlt;
