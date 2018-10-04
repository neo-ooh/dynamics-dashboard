import React, { Component } from 'react'
import TextField from 'components/TextField'
import Button from 'components/Button'

import { defineMessages, injectIntl } from 'react-intl'

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

  // LOCALIZATION
  messages = defineMessages({
    title: {
      id: 'dynamics.login.title',
      description: 'Message to greet visitors',
      defaultMessage: 'Please log in.',
    },
    email: {
      id: 'dynamics.login.email',
      description: 'Placeholder for the email input field',
      defaultMessage: 'e-Mail address',
    },
    password: {
      id: 'dynamics.login.password',
      description: 'Placeholder for the password input field',
      defaultMessage: 'Password',
    },
    login: {
      id: 'dynamics.login.button',
      description: 'Text displayed on the log-in button',
      defaultMessage: 'Log in',
    },
  })

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
        <h3>{ this.props.intl.formatMessage(this.messages.title) }</h3>
        <form>
          <TextField
            label={ this.props.intl.formatMessage(this.messages.email) }
            placeholder="neo@traffic.com"
            onChange={ this.onEmailChange } />
          <TextField
            type="password"
            label={ this.props.intl.formatMessage(this.messages.password) }
            placeholder="•••••"
            onChange={ this.onPasswordChange } />
          <Button
            value={ this.props.intl.formatMessage(this.messages.login)}
            onClick={ this.onLogin }
            loading={ this.state.loading }/>
        </form>
      </section>
    )
  }
}

export default injectIntl(LoginPage)
