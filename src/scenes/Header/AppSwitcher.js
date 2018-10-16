import React, { Component } from 'react'
import messages from 'library/messages'

import { injectIntl } from 'react-intl'

class AppSwitcher extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggleSwitch = () => {
    this.setState(oldState => ({
      isOpen: !oldState.isOpen
    }))
  }

  neoApps = [{
    name: 'ad-direct',
    url: 'https://ad-direct.ca/'
  }, {
    name: 'dynamics',
    url: 'https://dynamics.ad-direct.ca/'
  }]

  render () {
    const isHidden = this.state.isOpen ? '' : 'hidden'
    const toggleIsActive = this.state.isOpen ? 'active' : ''

    return [
      <div
        className={'app-switcher-icon ' + toggleIsActive}
        key="icon"
        onClick={this.toggleSwitch} />,
      <section
        className={'page-overlay ' + isHidden}
        onClick={this.toggleSwitch}
        key="overlay" />,
      <section className={'app-switcher-window ' + isHidden} key="window">
        <div className="app-switcher-up-arrow" />
        <div className="app-switcher-title">
          { this.props.intl.formatMessage(messages.app.appSwitcherTitle) }
        </div>
        <hr />
        {
          this.neoApps.map(app => (
            <div className="app-switcher-window-item" key={app.name}>
              <a href={app.url} >
                <div className={'app-switcher-window-item-icon ' + app.name} />
              </a>
            </div>
          ))
        }
      </section>,
    ]
  }
}

export default injectIntl(AppSwitcher)
