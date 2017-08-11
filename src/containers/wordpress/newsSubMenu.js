/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import { Link } from 'react-router';

import style from './style.css';

class NewsSubMenu extends Component {
  render() {
    let container=[];
    let post_title=this.props.title;
    container.push(<Link to='/wordpress'>Home </Link>);
    container.push(<Link to='/wordpress/posts'>/News </Link>);
     
    return (
      <div className={`col-xs-12 ${style.postMenuContainer}`}>
        <div className={style.postMenu_empty_row} />
        <div className={`row ${style.news_nav}`}>
           <div className='col-xs-12 col-sm-4'>{container} </div>
           <div className='col-xs-12 col-sm-8'>
             <h1 dangerouslySetInnerHTML={{ __html: post_title}} />
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
