import React, { Component } from 'react'

import { injectIntl } from 'react-intl'

class Button extends Component {
  render () {
    return (
      <button
        type="button"
        className={
          'button '
          + (this.props.primary ? 'primary ' : ' ')
          + (this.props.loading ? 'loading ' : ' ')
          + (this.props.flush ? 'flush ' : ' ')
        }
        onClick={ this.props.onClick }>
        { this.props.value }
      </button>
    )
  }
}

Button.defaultProps = {
  primary: false,
  loading: false,
  flush: false,
}

export default injectIntl(Button)
