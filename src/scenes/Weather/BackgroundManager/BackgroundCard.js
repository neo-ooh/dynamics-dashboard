import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import api from 'library/api'

import ImageCard from 'components/Cards/ImageCard'
import FilledBackgroundCard from './BackgroundCard/FilledBackgroundCard'
import EmptyBackgroundCard from './BackgroundCard/EmptyBackgroundCard'

class BackgroundCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uploading: false,
    }
  }

  onUpload = background => {
    this.setState({
      uploading: true,
    })

    const formData = new FormData()
    formData.append('country', this.props.country)
    formData.append('province', this.props.province)
    formData.append('city', this.props.city)
    formData.append('period', this.props.period)
    formData.append('support', this.props.support)
    formData.append('weather', this.props.weather)
    formData.append('background', background)

    api.post('/dynamics/weather/backgrounds', formData).then(response => {
      this.setState({
        uploading: false,
      })

      if(response === null) return

      this.props.onUpdate(response.background)
    })
  }

  onDelete = backgroundID => {
    api.delete('/dynamics/weather/backgrounds/' + backgroundID).then(this.props.onDelete)
  }

  hasBackground () {
    if(this.props.background === null) return false

    if(this.props.background.location.country === this.props.country &&
       this.props.background.location.province === this.props.province &&
       this.props.background.location.city === this.props.city
    ) {
      return true
    }
  }

  render () {
    return (
      <div className={'weather-background-card-holder ' + this.props.support} >
        <div className="weather-background-card-label">
          { this.props.label }
        </div>
        { this.hasBackground()
        ? <FilledBackgroundCard
            src={ this.props.background.path }
            onDelete={ this.onDelete }
            background={this.props.background}
          />
        : <EmptyBackgroundCard
            uploading={this.state.uploading}
            onUpload={this.onUpload}
            background={this.props.background}
          /> }
      </div>
    )
  }

  // Image Card

  imageCard () {
    return (
      <div className="weather-background-card-content">
        <ImageCard
          src={this.props.url} />
      </div>
    )
  }
}

BackgroundCard.defaultProps = {
  url: null
}

export default injectIntl(BackgroundCard)
