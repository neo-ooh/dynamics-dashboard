import React, { Component } from 'react'
import { injectIntl } from 'react-intl'

import Card from '../Card'

class ImageCard extends Component {
  render () {
    return <Card
      background={this.props.src}
      type="card-image"
    />
  }
}

export default injectIntl(ImageCard)
