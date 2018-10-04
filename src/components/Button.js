import React, { Component } from 'react'

import { injectIntl } from 'react-intl'

class Button extends Component {
  render () {
    return (
      <button
        type="button"
        className={ 'button ' + (this.props.primary ? 'primary' : '') + ' ' + (this.props.loading ? 'loading' : '') }
        onClick={ this.props.onClick }>
        { this.props.value }
      </button>
    )
  }
}

export default injectIntl(Button)
