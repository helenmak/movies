import React from 'react';
import {connect} from 'react-redux';

import * as style from './style.scss';

class Preloader extends React.Component{
  constructor(){
    super();
    this.state = {
      isShown: false
    }
  }


  render(){
    return(
      <div className = {style.modalPreloader}>
        <div className = {style.preloader}></div>
      </div>
    )
  }
}

export default Preloader
