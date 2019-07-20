import React, { Component } from 'react'
import './App.css'

import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import api from 'library/api'

import Header from 'scenes/Header'
import Sidebar from 'scenes/Sidebar'
import LoginPage from 'scenes/LoginPage'
import Index from 'scenes/Index'
import ErrorPopUp from 'scenes/ErrorPopUp'

import News from 'scenes/News'
import Weather from 'scenes/Weather'
import Params from 'scenes/Params'

import { withCookies } from 'react-cookie'

// LOCALIZATIONS
import { injectIntl } from 'react-intl'

import './style/main.scss'

class App extends Component {
  constructor (props) {
    super(props)

    const user = this.props.cookies.get('user') || null

    api.setErrorCallback(this.onNetworkError)
    api.setUnauthorizedCallback(this.onLogOut)

    this.state = {
      user: user,
      error: null,
      location: window.location,
      ready: false,
    }
  }

  componentDidMount () {
    this.state.user && this.onLogin(this.state.user)

    this.setState({ ready: true })
  }

  isUser = () => this.state.user !== null

  onLogin = userInfos => {
    api.setUserToken(userInfos.token)

    this.props.cookies.set('user', { name: userInfos.name, token: userInfos.token }, {
      path: '/',
      maxAge: 900
    })

    this.setState({
      user: {
        name: userInfos.name,
        token: userInfos.token,
      },
      error: null
    })
  }

  onLogOut = () => {
    this.props.cookies.remove('user')
    api.setUserToken('')
    this.setState({
      user: null
    })
  }

  onNetworkError = error => {
    // reset error message if needed, then set the new message
    console.log(error)
    this.setState({ error: error })
  }

  onErrorClose = () => {
    this.setState({ error: null })
  }

  dynamics = ['news', 'weather']

  dynamicsHomeComponents = {
    weather: Weather,
    news: News
  }

  render () {
    if (!this.state.ready) return null

    if (!this.isUser()) {
      return (
        <main>
          <Header />
          <LoginPage
            key="login-page"
            onLogin={this.onLogin}/>
          <ErrorPopUp
            message={ this.state.error }
            key="error-popup"
            onErrorClose={ this.onErrorClose } />
        </main>
      )
    }

    return (
      <main>
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <Index {...props} dynamics={this.dynamics} />} />
          <Route render={props => <Sidebar {...props} dynamics={this.dynamics} />} />
        </Switch>
        <Switch>
          { this.dynamics.map(dynamic => (
            <Route key={dynamic} path={'/dynamic/' + dynamic} component={this.dynamicsHomeComponents[dynamic]} />
          )) }
          <Route key="params" path={'/params'} component={Params} />
        </Switch>
        <ErrorPopUp
          message={ this.state.error }
          key="error-popup"
          onErrorClose={ this.onErrorClose } />
      </main>
    )
  }
}

export default withRouter(withCookies(injectIntl(App)))
