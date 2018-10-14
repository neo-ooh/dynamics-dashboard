import React, { Component } from 'react'

import { defineMessages, injectIntl } from 'react-intl'
import ImageCard from 'components/Cards/ImageCard'

class FilledBackgroundCard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="weather-background-card-image">
        <ImageCard src={this.props.src} />
        <div className="weather-background-card-overlay" onClick={this.props.onDelete.bind(this, this.props.background.id)}>
          <span>{ this.props.intl.formatMessage(FilledBackgroundCard.messages.deleteBackground) }</span>
        </div>
      </div>
    )
  }
}

FilledBackgroundCard.messages = defineMessages({
  deleteBackground: {
    id: 'dynamics.weather.delete-background',
    description: 'Delete background caption when hovering a background',
    defaultMessage: 'Remove background',
  }
})

export default injectIntl(FilledBackgroundCard)
