'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const {Router, Route, IndexRoute, browserHistory} = require('react-router')
const Home = require('./home')

class App extends React.Component {
  render () {
    return <div>
      <header>
      </header>
      {this.props.children}
      <footer>
      </footer>
    </div>
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'))
