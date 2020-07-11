import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import api from 'library/api'

import ImageCard from 'components/Cards/ImageCard'
import FilledBackgroundCard from 'components/Cards/FilledBackgroundCard'
import EmptyBackgroundCard from 'components/Cards/EmptyBackgroundCard'

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
    formData.append('category', this.props.category)
    formData.append('support', this.props.support)
    formData.append('locale', this.props.locale)
    formData.append('background', background)

    api.post('/dynamics/news/backgrounds', formData).then(response => {
      this.setState({
        uploading: false,
      })

      if(response === null) return

      this.props.onUpdate(response.background)
    })
  }

  onDelete = backgroundID => {
    api.delete('/dynamics/news/backgrounds/' + backgroundID).then(this.props.onDelete)
  }

  hasBackground () {
    return this.props.background !== null
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
