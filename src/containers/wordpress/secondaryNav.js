import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

import style from './style.css';
import { MENU_IDS,WP_PAGES } from './../../constants';

class SecondaryNav extends Component {
  getStyle(menu_cat){
    switch(menu_cat){
    case 'home': return style.homeMenuContainer;
    case 'about-us':return style.aboutMenuContainer;
    case 'contact-us':return style.contactMenuContainer;
    case 'projects-work-products-publications':return style.projectsMenuContainer;
    case 'post':return style.postMenuContainer;
    }
  }
  render() {
    let container=[];
    let page_title=this.props.title;
    let page_id=this.props.id;
    let parent_id=this.props.parent;

    let menu_cat=(this.props.type==='post')?'post':MENU_IDS[this.props.parent];
    let menu_container=this.getStyle(menu_cat);

    container.push(<Link to='/home'>Home </Link>);
    if(this.props.type==='post'){
      container.push(<Link to='/posts'> /News</Link>);
    }
    else{
      if(menu_cat==='home'){return (<div />);}
      let parent=MENU_IDS[parent_id];
      let parent_label=WP_PAGES[parent].label;
      container.push(<Link to={`/${parent}`}> /{parent_label}/</Link>);
      if(parent_id !== page_id){
        container.push(<span dangerouslySetInnerHTML={{ __html: page_title}} />);
      }

    }
    return (
       <div className={menu_container}>
         <div className='container-fluid'>
           <div className={style.secondaryNavEmptyRow} />
           <div className={`row ${style.secondaryNav}`}>
             <div className='container'>
               <div className='col-xs-12 col-sm-4'>{container} </div>
               <div className='col-xs-12 col-sm-8 text-xs-right'>
                 <h1 dangerouslySetInnerHTML={{ __html: page_title}} />
               </div>
             </div>
           </div>
         </div>
       </div>
    );
  }
}

SecondaryNav.propTypes = {
  id: PropTypes.string,
  parent: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SecondaryNav;
