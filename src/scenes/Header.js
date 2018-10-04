import React, { Component } from 'react'

import AppSwitcher from './Header/AppSwitcher'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <section id="header">
        <AppSwitcher />
        <Link to={'/'} className="header-app-logo" />
        {
          this.props.user ? <div className="header-hello-box">Hello {this.user.name}</div> : null
        }
      </section>
    )
  }
}
