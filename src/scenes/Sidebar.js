import React, { Component } from 'react'

import { defineMessages, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  constructor (props) {
    super(props)
  }

  messages = defineMessages({
    dynamics: {
      id: 'dynamics.sidebar.dynamics',
      description: 'Title of the dynamic section on the sidebar',
      defaultMessage: 'Dynamics',
    },
    params: {
      id: 'dynamics.sidebar.params',
      description: 'Title of the parameters section on the sidebar',
      defaultMessage: 'Params',
    },
    keys: {
      id: 'dynamics.params.keys',
      description: 'API keys',
      defaultMessage: 'Keys',
    }
  })

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
        <h3 className="sidebar-section-title">{ this.props.intl.formatMessage(this.messages.dynamics) }</h3>
        { this.props.dynamics.map(dynamic => { return this.link('/dynamic/' + dynamic + '/', dynamic) }) }
        <h3 className="sidebar-section-title">{ this.props.intl.formatMessage(this.messages.params) }</h3>
        { this.link('/params/keys/', 'keys') }
      </section>
    )
  }
}

export default injectIntl(Sidebar)
