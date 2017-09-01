import React, {Component} from 'react';

import style from './../style.css';

class NewsSubMenu extends Component {
  render() {
    let container=[];
    let post_title=this.props.title;
    container.push(<a href='/wordpress/home'>Home </a>);
    container.push(<a href='/posts'>/News </a>);

    return (
      <div className={style.postMenuContainer}>
        <div className='container-fluid'>
          <div className={style.postMenu_empty_row} />
          <div className={`row ${style.news_nav}`}>
             <div className='col-xs-12 col-sm-4'>{container} </div>
             <div className='col-xs-12 col-sm-8 text-xs-right'>
               <h1 dangerouslySetInnerHTML={{ __html: post_title}} />
             </div>
          </div>
        </div>
      </div>
    );
  }
}

NewsSubMenu.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default NewsSubMenu;
