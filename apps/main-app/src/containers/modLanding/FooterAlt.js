import style from './style.scss';
import PropTypes from "prop-types";

const FooterAlt = ({links, note, footerStyle, logoImgSrc, titleBarStyle, modShortName}) => {
  return (
      <div className={`${footerStyle} ${style.modFooter}`}>
        <div className={`container ${style.modFooterContainer}`}>
          <div className={`{style.modFooterText} ${titleBarStyle}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-med-2 col-md-2 col-lg-2 col-xl-2">
                  <img src={logoImgSrc} height="50px" /> <span className={style.titleBarText} dangerouslySetInnerHTML={{__html: modShortName}}/>
                </div>
                <div className="col-med-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="row">
                  { links && links.map(link => {
                      return (
                        <div className="col-med-2 col-md-2 col-lg-2 col-xl-2">
                          <a href={link[1]}>{link[0]}</a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                { note && <div><p>{note}</p></div> }
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
