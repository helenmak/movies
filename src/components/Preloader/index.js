import React from 'react';
import {connect} from 'react-redux'

import style from './style.css';

class Preloader extends React.Component{
  state = {isShown: false}
  renderPreloader = isShown =>
    isShown &&
    <div className = "modalPreloader">
      <div className = "preloader"></div>
    </div>

  render(){
    return (
      <React.Fragment>
        {this.renderPreloader(this.props.preloader)}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    preloader: state.getIn(['preloader'])
  }
}

export default connect(mapStateToProps)(Preloader)
