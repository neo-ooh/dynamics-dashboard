import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { defineMessages, injectIntl } from 'react-intl'
import WideListCard from 'components/Cards/WideListCard'

class Index extends Component {
  constructor (props) {
    super(props)
  }

  messages = defineMessages({
    generateURL: {
      id: 'dynamics.weather.generate-url',
      description: 'Screen where the user can generate a URL',
      defaultMessage: 'Generate URL',
    },
    editBackgrounds: {
      id: 'dynamics.weather.edit-backgrounds',
      description: 'Screen where the user can edit the weather dynamic\'s backgrounds',
      defaultMessage: 'Edit Backgrounds',
    }
  })

  render () {
    return (
      <section className="content-column">
        <h1>Weather Dynamic</h1>
        <Link to="generate-url">
          <WideListCard
            label={this.props.intl.formatMessage(this.messages.generateURL)}
            icon="link" />
        </Link>
        <Link to="backgrounds">
          <WideListCard
            label={this.props.intl.formatMessage(this.messages.editBackgrounds)} />
        </Link>
      </section>
    )
  }
}

export default injectIntl(Index)
