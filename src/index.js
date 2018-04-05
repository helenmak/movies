import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import reducers from './reducers'

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(history))))

ReactDOM.render(
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
// https://github.com/gajus/redux-immutable/blob/master/README.md#using-with-react-router-redux

// history.push({
//   pathname: `/form/${item.type}`,
//   state: { group: item.group, formType: item.type }
// })
