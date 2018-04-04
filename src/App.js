import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.css';

import MainPage from './components/MainPage'
import SearchSection from './components/SearchSection'
import MoviesCards from './components/MoviesCards'
import MoviePage from './components/MoviePage'
import {Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movie Database</h1>
        </header>
        <MainPage>
          <Switch>
            <Route path="/" exact render = { props =>
              <React.Fragment>
                <SearchSection/>
                <MoviesCards {...props}/>
              </React.Fragment>
            } />
            <Route path="/movies/:id" component = {MoviePage}/>
          </Switch>
        </MainPage>
      </div>
    )
  }
}

export default App;
