import React, { Component } from 'react'

import { injectIntl } from 'react-intl'
import Card from '../Card'

class BigIconCard extends Component {
  render () {
    return <Card
      label={this.props.label}
      icon={this.props.icon}
      type="card-big-icon"/>
  }
}

export default injectIntl(BigIconCard)
