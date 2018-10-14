import React, { Component } from 'react'

import { injectIntl } from 'react-intl'

class PromptWindow extends Component {
  render () {
    return [
      <section
        className={'page-overlay'}
        onClick={this.props.onClose}
        key="overlay" />,
      <section
        className="prompt-window-container"
        key="window">
        <section className="prompt-window">
          { this.props.children }
        </section>
      </section>
    ]
  }
}

PromptWindow.defaultProps = {
  onClose: () => {}
}


export default injectIntl(PromptWindow)
