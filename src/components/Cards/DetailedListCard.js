import React, { Component } from 'react'

import Card from '../Card'

class DetailedListCard extends Component {
  render () {
    return <Card
      label={this.props.label}
      sublabel={this.props.sublabel}
      type="card-detailed-list"
    />
  }
}

export default DetailedListCard
