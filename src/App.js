import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.css';
import MainPage from './components/MainPage'
import SearchSection from './components/SearchSection'

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movie Database</h1>
        </header>
        <MainPage>
          <SearchSection/>
        </MainPage>
      </div>
    )
  }
}

export default App;
