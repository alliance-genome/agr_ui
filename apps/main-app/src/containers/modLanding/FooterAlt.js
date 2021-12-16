import style from './style.scss';
import PropTypes from "prop-types";

const FooterAlt = ({links, footerStyle, modShortName}) => {
  let generateHtml = (links, modShortName) => {
    let htmlString = '<div class="container-fluid">' +
                     '<div class="row">' +
                     '   <div class="col-med-2 col-md-2 col-lg-2 col-xl-2">' +
                     `     ${modShortName}` +
                     '  </div>';
    let counter = 0;
    for (let i=0; i< links.length; i++){
        htmlString += '<div class="col-med-2 col-md-2 col-lg-2 col-xl-2">';
        htmlString += `      <a href="${links[i][1]}">${links[i][0]}</a>`;
        htmlString += '</div>';
        counter += 1;
        // Add a blank cell under mod name to keep spaces looking okay.
        if(counter == 5){
            htmlString += '<div class="col-med-2 col-md-2 col-lg-2 col-xl-2"></div>';
            counter = 0;
        }
    }
    return htmlString;
  }

  return (
      <div className={`${footerStyle} ${style.titleBar}`}>
        <div className={`container ${style.titleBarContainer}`}>
          <div className={style.titleBarText} dangerouslySetInnerHTML={{__html: generateHtml(links, modShortName)}}/>
        </div>
      </div>
  );
}

FooterAlt.propTypes = {
  links: PropTypes.array.isRequired,
  footerStyle: PropTypes.string.isRequired,
  modShortName: PropTypes.string.isRequired
}

export default FooterAlt;