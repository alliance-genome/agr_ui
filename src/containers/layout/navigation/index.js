import React, { Component } from 'react';
import TopHeaher from './topHeader';
import MiddleHeader from './middleHeader';


class NavMenu extends Component{
  render(){
    return(
      <div>
        <TopHeaher />
        <MiddleHeader />
      </div>
    );
  }

}

export default NavMenu;
