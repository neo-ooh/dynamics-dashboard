import React, { Component } from 'react'
import Card from '../Card'

class WideListCard extends Component {
  render () {
    return <Card
      label={this.props.label}
      icon={this.props.icon}
      type="card-wide-list darker-icon"/>
  }
}

export default WideListCard
