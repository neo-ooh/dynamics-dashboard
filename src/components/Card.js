import React, { Component } from 'react'

import { injectIntl } from 'react-intl'

class Card extends Component {
  render () {
    return (
      <div
        className={'card ' + this.props.type + ' ' + this.props.icon}
        onClick={this.props.onClick}>
        <div className="card-icon"></div>
        <div className="card-label">
          { this.props.label }
        </div>
      </div>
    )
  }
}

export default injectIntl(Card)
