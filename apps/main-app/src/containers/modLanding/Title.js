import style from './style.scss';

const Title = ({bannerStyle, titleBarStyle, logoImgSrc, modFullName}) => {
  return (
  <div className={bannerStyle}>
        <div className={style.secondaryNavEmptyRow} />
        <div className={titleBarStyle}>
          <div className='container'>
            <h1><img src={logoImgSrc} height="50px"/> <span dangerouslySetInnerHTML={{__html: modFullName}}/></h1>
          </div>
        </div>
      </div>
  );
}

export default Title;
