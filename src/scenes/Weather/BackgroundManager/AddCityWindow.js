import React, { Component } from 'react'
import { defineMessages, injectIntl } from 'react-intl'

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
        <h1>{ this.props.intl.formatMessage(AddCityWindow.messages.addCity) }</h1>
        <TextField
          label={ this.props.intl.formatMessage(AddCityWindow.messages.cityName) }
          onChange={this.onCityChange}
          value={this.state.city}
          focus />
        <div className="button-row right">
          <Button
            value={ this.props.intl.formatMessage(AddCityWindow.messages.cancel) }
            onClick={ this.props.onClose } />
          <Button
            value={ this.props.intl.formatMessage(AddCityWindow.messages.add) }
            onClick={ this.onAdd }
            primary />
        </div>
      </PromptWindow>
    )
  }
}

AddCityWindow.messages = defineMessages({
  addCity: {
    id: 'dynamics.weather.cities.window-title',
    description: 'Province cities: Add a new city to the list',
    defaultMessage: 'Add a city',
  },
  cityName: {
    id: 'dynamics.weather.cities.name',
    description: 'Name of the new city - text field label',
    defaultMessage: 'City name',
  },
  cancel: {
    id: 'dynamics.weather.cities.cancel',
    description: 'Cancel adding a city button',
    defaultMessage: 'Cancel',
  },
  add: {
    id: 'dynamics.weather.cities.window-add',
    description: 'Add a city button',
    defaultMessage: 'Add',
  },
})

export default injectIntl(AddCityWindow)
