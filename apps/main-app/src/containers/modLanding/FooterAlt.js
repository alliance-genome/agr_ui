import style from './style.scss';
import PropTypes from "prop-types";

const FooterAlt = ({link, links, note, footerStyle, logoImgSrc, titleBarStyle, modShortName}) => {
  return (
      <div className={`${footerStyle} ${style.modFooter}`}>
        <div className={`container ${style.modFooterContainer}`}>
          <div className={`{style.modFooterText} ${titleBarStyle}`}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-med-2 col-md-2 col-lg-2 col-xl-2">
                  <a href={link}><img src={logoImgSrc} height="50px" /></a> <span className={style.modFooterLabel} dangerouslySetInnerHTML={{__html: modShortName}}/>
                </div>
                <div className="col-med-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="row">
                  { links && links.map(link => {
                      return (
                        <div key={link[0]} className="col-med-2 col-md-2 col-lg-2 col-xl-2">
                          <a href={link[1]}><span dangerouslySetInnerHTML={{__html: link[0]}}/></a>
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
