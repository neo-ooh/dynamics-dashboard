import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'

import { Link } from 'react-router-dom'

class Sidebar extends Component {
  link = (url, label) => (
    <Link
      to={url}
      className={'sidebar-link ' + (window.location.pathname.includes(url) ? 'active' : '')}
      key={url}>
      {label}
    </Link>
  )

  render () {
    return (
      <section id="sidebar">
        <h3 className="sidebar-section-title">{ this.props.intl.formatMessage(messages.app.dynamics) }</h3>
        { this.props.dynamics.map(dynamic => { return this.link('/dynamic/' + dynamic + '/', dynamic) }) }
        <h3 className="sidebar-section-title">{ this.props.intl.formatMessage(messages.params.params) }</h3>
        { this.link('/params/api-keys', this.props.intl.formatMessage(messages.params.apiKeys)) }
      </section>
    )
  }
}

export default injectIntl(Sidebar)
