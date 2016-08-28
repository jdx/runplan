'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const {Router, Route, IndexRoute, browserHistory, applyRouterMiddleware} = require('react-router')
const Home = require('./home')
const {useScroll} = require('react-router-scroll')

class App extends React.Component {
  render () {
    return <div>
      <header>
      oooo
      </header>
      {this.props.children}
      <footer>
      </footer>
    </div>
  }
}

ReactDOM.render((
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'))
