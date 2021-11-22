import style from './style.scss';
import PropTypes from "prop-types";

const Title = ({bannerStyle, titleBarStyle, logoImgSrc, modFullName}) => {
  return (
  <div className={bannerStyle}>
        <div className={style.titleBarEmptyRow} />
        <div className={titleBarStyle}>
          <div className='container'>
            <h1><img src={logoImgSrc} height="50px"/> <span className={style.titleBarText} dangerouslySetInnerHTML={{__html: modFullName}}/></h1>
          </div>
        </div>
      </div>
  );
}

Title.propTypes = {
  bannerStyle: PropTypes.string.isRequired,
  titleBarStyle: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
  modFullName: PropTypes.string.isRequired
}

export default Title;
