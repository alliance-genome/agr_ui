import style from './style.scss';
import PropTypes from "prop-types";

const Title = ({bannerStyle, titleBarStyle, modFullName}) => {
  return (
    <div className={`${bannerStyle} ${style.banner}`}>
      <div className={style.titleBarEmptyRow} />
      <div className={`${titleBarStyle} ${style.titleBar}`}>
        <div className={`container ${style.titleBarContainer}`}>
          <h1><span className={style.titleBarText} dangerouslySetInnerHTML={{__html: modFullName}}/></h1>
        </div>
      </div>
    </div>
  );
}

Title.propTypes = {
  bannerStyle: PropTypes.string.isRequired,
  titleBarStyle: PropTypes.string.isRequired,
  modFullName: PropTypes.string.isRequired
}

export default Title;
