import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './container/HomePage'
import NewReleasePage from './container/NewReleases'
import './styles/styles.scss'
import './assets/logo.png'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/callback' component={HomePage} />
          <Route exact path='/new-releases' component={NewReleasePage} />
          <Route path='/new-releases/callback' component={NewReleasePage} />
          {/* <Route path='*' component={NotFound} /> */}
        </Switch>
      </div>
    )
  }
}

export default App
