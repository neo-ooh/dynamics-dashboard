import React, { Component } from 'react'
import messages from 'library/messages'

import { injectIntl } from 'react-intl'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

class ErrorPopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      message: this.props.message || null,
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.message === this.props.message) return

    this.setState({
      message: this.props.message || null,
    })
  }

  render () {
    return (
      <TransitionGroup
        component={null}>
        { this.state.message &&
          <CSSTransition
            classNames="error-popup"
            timeout={ 150 }>
            <section id="error-popup" onClick={this.props.onErrorClose}>
              <div className="title">{ this.props.intl.formatMessage(messages.app.errorPopupTitle) }</div>
              <div className="message">
                { this.state.message }
              </div>
            </section>
          </CSSTransition>
        }
      </TransitionGroup>
    )
  }
}

export default injectIntl(ErrorPopUp)
