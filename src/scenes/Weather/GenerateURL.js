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
      design: '',
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

  onWeatherTypeChanges = newType => {
    this.setState({ type: newType })
  }

  onLanguageChanges = newLanguage => {
    this.setState({ language: newLanguage })
  }

  onAPIKeyChanges = newKey => {
    this.setState({ apiKey: newKey })
  }

  onDesignChanges = newDesign => {
    this.setState({ design: newDesign })
  }

  weatherTypes = [
    { value: 'now', label: this.props.intl.formatMessage(messages.weather.contentNow) },
    { value: 'forecast', label: this.props.intl.formatMessage(messages.weather.contentForecast) },
    { value: 'national', label: this.props.intl.formatMessage(messages.weather.contentNational) },
  ]

  languages = [
    { value: '', label: this.props.intl.formatMessage(messages.weather.autoLanguage) },
    { value: 'en-CA', label: this.props.intl.formatMessage(messages.app.english) },
    { value: 'fr-CA', label: this.props.intl.formatMessage(messages.app.french) },
  ]

  designs = [
    { value: '', label: this.props.intl.formatMessage(messages.weather.autoLanguage) },
    { value: 'DCA', label: 'DCA' },
    { value: 'FCL', label: 'FCL & LED' },
    { value: 'WDE', label: 'Halifax (WDE)' },
    { value: 'SHD', label: 'Sports HD' },
    { value: 'PHD', label: 'Pompe Media HD' },
    { value: 'PML', label: 'Pompe Media Landscape' },
    { value: 'PMP', label: 'Pompe Media Portrait' },
  ]

  generateURL = () => {
    return process.env.REACT_APP_WEATHER_URL + '/?content=' + this.state.type + (this.state.language && '&locale=' + this.state.language) + (this.state.design && '&design=' + this.state.design) + '&key=' + this.state.apiKey
  }

  copyURL = () => {
    copy(this.generateURL())
  }

  render () {

    let contentForDesign;

    if(this.state.design === 'WDE') {
      contentForDesign = this.weatherTypes.slice(0, 2)
    } else if (this.state.design === 'PML' || this.state.design === 'PMP') {
      contentForDesign = this.weatherTypes.slice(1, 2)
    } else {
      contentForDesign = this.weatherTypes
    }

    return (
      <section className="content-column">
        <Link to="/dynamic/weather/" className="nav-back-upper-title">
          <span className="nav-back-arrow" >&lt;</span>
          Weather Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(messages.weather.generateURL) }</h1>
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.app.design) }
          items={ this.designs }
          onChange={this.onDesignChanges}/>
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.weather.contentType) }
          items={ contentForDesign }
          onChange={this.onWeatherTypeChanges}/>
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.weather.language) }
          items={ this.languages }
          onChange={this.onLanguageChanges}/>
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
