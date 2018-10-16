import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'

import { Link } from 'react-router-dom'
import WideListCard from 'components/Cards/WideListCard'

class Index extends Component {

  render () {
    return (
      <section className="content-column">
        <h1>Weather Dynamic</h1>
        <Link to="generate-url">
          <WideListCard
            label={this.props.intl.formatMessage(messages.weather.generateURL)}
            icon="link" />
        </Link>
        <Link to="backgrounds">
          <WideListCard
            label={this.props.intl.formatMessage(messages.weather.editBackgrounds)} />
        </Link>
      </section>
    )
  }
}

export default injectIntl(Index)
