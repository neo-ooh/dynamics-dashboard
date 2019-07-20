import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'

import ImageCard from 'components/Cards/ImageCard'

class FilledBackgroundCard extends Component {
  render () {
    return (
      <div className="weather-background-card-image">
        <ImageCard src={this.props.src} />
        <div className="weather-background-card-overlay" onClick={this.props.onDelete.bind(this, this.props.background.id)}>
          <span>{ this.props.intl.formatMessage(messages.weather.deleteBackground) }</span>
        </div>
      </div>
    )
  }
}

export default injectIntl(FilledBackgroundCard)
