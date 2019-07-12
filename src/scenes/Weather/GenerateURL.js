import React, { Component } from 'react'
import SelectableCardList from 'components/SelectableCardList'
import Card from 'components/Card'
import { Link } from 'react-router-dom'
import Select from 'components/Select'

import api from 'library/api'
import messages from 'library/messages'

import { injectIntl } from 'react-intl'
import copy from 'copy-to-clipboard'

class GenerateURL extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'now',
      language: '',
      apiKey: '',
      support: '',
      keys: []
    }
  }

  componentDidMount () {
    api.get('/keys').then(keys => {
      if (keys === null) return

      const formattedKeys = keys.filter(key =>
        key.dynamics.filter(dynamic =>
          dynamic.slug === 'weather').length > 0)
        .map(key => ({
          label: key.name,
          value: key.key
        }))

      this.setState({
        keys: formattedKeys,
        apiKey: formattedKeys[0].value
      })
    })
  }

  weatherTypes = [
    { value: 'now', label: this.props.intl.formatMessage(messages.weather.contentNow) },
    { value: 'forecast', label: this.props.intl.formatMessage(messages.weather.contentForecast) },
    { value: 'national', label: this.props.intl.formatMessage(messages.weather.contentNational) },
  ]

  onWeatherTypeChanges = newType => {
    this.setState({ type: newType })
  }

  onLanguageChanges = newLanguage => {
    this.setState({ language: newLanguage })
  }

  onAPIKeyChanges = newKey => {
    this.setState({ apiKey: newKey })
  }

  onSupportChanges = newSupport => {
    this.setState({ support: newSupport })
  }

  languages = [
    { value: '', label: this.props.intl.formatMessage(messages.weather.autoLanguage) },
    { value: 'en-CA', label: this.props.intl.formatMessage(messages.app.english) },
    { value: 'fr-CA', label: this.props.intl.formatMessage(messages.app.french) },
  ]

  supports = [
    { value: '', label: this.props.intl.formatMessage(messages.weather.autoLanguage) },
    { value: 'DCA', label: 'DCA' },
    { value: 'FLC', label: 'FCL' },
    { value: 'LED', label: 'LED' },
    { value: 'WDE', label: 'Halifax (WDE)' },
    { value: 'SHD', label: 'SHD' },
  ]

  generateURL = () => {
    return process.env.REACT_APP_WEATHER_URL + '/?content=' + this.state.type + (this.state.language && '&lang=' + this.state.language) + (this.state.support && '&support=' + this.state.support) + '&key=' + this.state.apiKey
  }

  copyURL = () => {
    copy(this.generateURL())
  }

  render () {
    return (
      <section className="content-column">
        <Link to="/dynamic/weather/" className="nav-back-upper-title">
          <span className="nav-back-arrow" >&lt;</span>
          Weather Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(messages.weather.generateURL) }</h1>
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.weather.contentType) }
          items={ this.weatherTypes }
          onChange={this.onWeatherTypeChanges}/>
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.weather.language) }
          items={ this.languages }
          onChange={this.onLanguageChanges}/>
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.weather.support) }
          items={ this.supports }
          onChange={this.onSupportChanges}/>
        <Select
          label={ this.props.intl.formatMessage(messages.weather.APIKey) }
          options={ this.state.keys }
          onChange={this.onAPIKeyChanges}/>
        <h5 className="jumbo-card-upper-title">
          { this.props.intl.formatMessage(messages.weather.generatedURL) }
        </h5>
        <Card
          label={this.generateURL()}
          type="card-jumbo-size"
          onClick={this.copyURL}
        />
      </section>
    )
  }
}

export default injectIntl(GenerateURL)
