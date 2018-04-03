import React from 'react';
import {connect} from 'react-redux';

import * as style from './style.scss';

class Message extends React.Component{
  constructor(){
    super();
  }
  renderMsg(){
    let msg = '';
    if(this.props.successMsg){
      return msg = 'Success!'
    }
    if(this.props.abortSubmit){
      return msg = this.props.abortMsg;
    }
  }

  render(){
    return(
      <div className = {style.message}>
        {this.renderMsg()}
      </div>
    )
  }
}

export default Message
