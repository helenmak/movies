import React from 'react';

import style from './style.css';

class Preloader extends React.Component{
  constructor(){
    super();
    this.state = {
      isShown: false
    }
  }


  render(){
    return(
      <div className = "modalPreloader">
        <div className = "preloader"></div>
      </div>
    )
  }
}

export default Preloader
