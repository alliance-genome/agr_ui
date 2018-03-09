import React, {Component} from 'react';
import SocialMedia from '../socialMedia';
import style from '../style.css';

class Topheader extends Component{
  render(){
    return (
      <div className={`${style.solidBg}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 pull-right">
            <SocialMedia />
          </div>
        </div>
        </div>
      </div>
    );

  }
}

export default Topheader;
