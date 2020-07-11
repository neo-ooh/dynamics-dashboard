import React, { Component } from 'react'
import messages from 'library/messages'

import TextField from 'components/TextField'
import Button from 'components/Button'
import { injectIntl } from 'react-intl'
import api from 'library/api'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  // EVENTS
  onEmailChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  onLogin = () => {
    this.setState({ loading: true })
    api.post('/auth/login', {
      email: this.state.email,
      password: this.state.password,
    }).then(response => {
      this.setState({ loading: false })

      if (response === null) return

      if (response.success) {
        this.props.onLogin(response)
      }
    })
  }

  // RENDER
  render () {
    return (
      <section className="login-page">
        <h3>{ this.props.intl.formatMessage(messages.app.loginTitle) }</h3>
        <form>
          <TextField
            label={ this.props.intl.formatMessage(messages.app.loginEmail) }
            placeholder="neo@traffic.com"
            onChange={ this.onEmailChange }
            focus
            autocomplete="email"
            onEnter={ this.onLogin }/>
          <TextField
            type="password"
            label={ this.props.intl.formatMessage(messages.app.loginPassword) }
            placeholder="•••••"
            autocomplete="current-password"
            onChange={ this.onPasswordChange }
            onEnter={ this.onLogin } />
          <Button
            value={ this.props.intl.formatMessage(messages.app.loginButton)}
            onClick={ this.onLogin }
            loading={ this.state.loading }/>
        </form>
      </section>
    )
  }
}

export default injectIntl(LoginPage)
