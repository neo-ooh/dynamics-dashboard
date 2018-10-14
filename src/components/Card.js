import React, { Component } from 'react'

import { injectIntl } from 'react-intl'

class Card extends Component {
  render () {

    return (
      <div
        className={'card ' + this.props.type + ' ' + this.props.icon}
        onClick={this.props.onClick}
        style={{backgroundImage: 'url(' + this.props.background + ')'}}
      >
        <div className="card-icon"></div>
        <div className="card-label">
          { this.props.label }
        </div>
      </div>
    )
  }
}

Card.defaultProps = {
  type: '',
  icon: '',
  onClick: () => {},
  background: '',
  label: ''
}

export default injectIntl(Card)
