import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import './styles/styles.scss'
import './assets/logo.png'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          {routes.map(({exact, path, component}, i) => (
            <Route exact={exact} path={path} component={component} key={i} />
          ))}
          {/* <Route path='*' component={NotFound} /> */}
        </Switch>
      </div>
    )
  }
}

export default App
