import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'

import PromptWindow from 'components/PromptWindow'
import TextField from 'components/TextField'
import Button from 'components/Button'

class AddCityWindow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: ''
    }
  }

  onCityChange = e => {
    this.setState({
      city: e.target.value
    })
  }

  onAdd = () => {
    this.props.onAdd(this.state.city)
  }

  render () {
    return (
      <PromptWindow onClose={this.props.onClose} >
        <h1>{ this.props.intl.formatMessage(messages.weather.addCityWindowTitle) }</h1>
        <TextField
          label={ this.props.intl.formatMessage(messages.weather.cityName) }
          onChange={this.onCityChange}
          value={this.state.city}
          focus />
        <div className="button-row right">
          <Button
            value={ this.props.intl.formatMessage(messages.weather.cancel) }
            onClick={ this.props.onClose } />
          <Button
            value={ this.props.intl.formatMessage(messages.weather.add) }
            onClick={ this.onAdd }
            primary />
        </div>
      </PromptWindow>
    )
  }
}

export default injectIntl(AddCityWindow)
