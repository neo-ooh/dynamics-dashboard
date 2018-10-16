import React, { Component } from 'react'
import { injectIntl } from 'react-intl'

import Button from 'components/Button'
import PromptWindow from 'components/PromptWindow'
import TextField from 'components/TextField'
import messages from 'library/messages'

class AddAPIKeyWindow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: ''
    }
  }

  onKeyChange = e => {
    this.setState({
      key: e.target.value
    })
  }

  onAdd = () => {
    this.props.onAdd(this.state.key)
  }

  render () {
    return (
      <PromptWindow onClose={this.props.onClose} >
        <h1>{ this.props.intl.formatMessage(messages.params.newAPIKey) }</h1>
        <TextField
          label={ this.props.intl.formatMessage(messages.params.APIKeyName) }
          onChange={this.onKeyChange}
          value={this.state.key}
          focus />
        <div className="button-row small right">
          <Button
            value={ this.props.intl.formatMessage(messages.params.cancel) }
            onClick={ this.props.onClose } />
          <Button
            value={ this.props.intl.formatMessage(messages.params.create) }
            onClick={ this.onAdd }
            primary />
        </div>
      </PromptWindow>
    )
  }
}

export default injectIntl(AddAPIKeyWindow)
