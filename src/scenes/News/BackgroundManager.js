import React, { Component } from 'react'

import { injectIntl } from 'react-intl'
import messages from 'library/messages'

import BackgroundsList from './BackgroundManager/BackgroundsList'
import { Link } from 'react-router-dom'
import Select from 'components/Select'

class BackgroundManager extends Component {
  constructor (props) {
    super(props)

    this.state = {
      support: 'DCA',
      locale: 'en'
    }
  }

  supports = [
    { value: 'DCA', label: 'DCA' },
    { value: 'DCF', label: 'DCA - Fitness' },
    { value: 'FCL', label: 'FCL' },
  ]

  locales = [
    { value: 'en', label: 'EN' },
    { value: 'fr', label: 'FR' },
  ]

  onSupportChange = support => {
    this.setState({
      support: support
    })
  }

  onLocaleChange = locale => {
    this.setState({
      locale: locale
    })
  }

  sortAlphabetically = (a, b) => a.label < b.label ? -1 : 1

  render () {
    return (
      <section className="content-column" key="background-manager">
        <Link to="/dynamic/news/"
          className="nav-back-upper-title">
          <span className="nav-back-arrow">&lt;</span>
          News Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(messages.weather.editBackgrounds) }</h1>
        <div className="filters">
          <Select
            label={ this.props.intl.formatMessage(messages.weather.support) }
            options={ this.supports }
            onChange={ this.onSupportChange }
            width={ 125 }/>
          <Select
            label={ this.props.intl.formatMessage(messages.news.locale) }
            options={ this.locales }
            onChange={ this.onLocaleChange }
            width={ 75 }/>
        </div>
        <BackgroundsList
          support={this.state.support}
          locale={this.state.locale}
        />
      </section>
    )
  }
}

export default injectIntl(BackgroundManager)
