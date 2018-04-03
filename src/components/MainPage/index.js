import React from 'react'
import {connect} from 'react-redux'

function MainPage(props){
  return (
    <div >
      {props.children}
    </div>
  )
}

export default MainPage
