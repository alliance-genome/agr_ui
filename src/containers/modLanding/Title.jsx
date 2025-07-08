import style from './style.module.scss';
import PropTypes from 'prop-types';

const Title = ({ bannerStyle, titleBarStyle, logoImgSrc, modFullName }) => {
  return (
    <div data-testid={'title_banner'} className={`${bannerStyle} ${style.banner}`}>
      <div className={style.titleBarEmptyRow} />
      <div className={`${titleBarStyle} ${style.titleBar}`}>
        <div className={`container ${style.titleBarContainer}`}>
          <div data-testid={'title_div'}>
            <img data-testid={'title_hex'} alt={'hex_' + modFullName} src={logoImgSrc} height="50px" />
            <span
              data-testid={'title_text'}
              className={style.titleBarText}
              dangerouslySetInnerHTML={{ __html: modFullName }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Title.propTypes = {
  bannerStyle: PropTypes.string.isRequired,
  titleBarStyle: PropTypes.string.isRequired,
  modFullName: PropTypes.string.isRequired,
};

export default Title;
