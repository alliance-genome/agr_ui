import style from './style.scss';
import PropTypes from "prop-types";

const FooterAlt = ({links, note, footerStyle, logoImgSrc, modShortName}) => {

  let generateHtml = (links, modShortName, note) => {
    if (!links){
        return "";
    }
    let htmlString = '<div class="container-fluid">' +
                     '   <div class="row">' +
                     '     <div class="col-med-2 col-md-2 col-lg-2 col-xl-2">' +
                     '     </div>';
    htmlString += '<div class="col-med-10 col-md-10 col-lg-10 col-xl-10">' +
                   '<div class="row">';
    for (let i=0; i< links.length; i++){
        htmlString += '<div class="col-med-2 col-md-2 col-lg-2 col-xl-2">';
        htmlString += `      <a href="${links[i][1]}">${links[i][0]}</a>`;
        htmlString += '</div>';
    }
    htmlString += "</div></div></div>"; // end container row container
    if (note){
        htmlString += `<div><p>${note}</p></div>`;
    }
    return htmlString;
  }

  return (
      <div className={`${footerStyle} ${style.modFooter}`}>
        <div className={`container ${style.modFooterContainer}`}>
          <div className={style.modFooterText} dangerouslySetInnerHTML={{__html: generateHtml(links, modShortName, note)}}/>
        </div>
      </div>
  );
}

FooterAlt.propTypes = {
  links: PropTypes.array.isRequired,
  note: PropTypes.string,
  footerStyle: PropTypes.string.isRequired,
}

export default FooterAlt;
