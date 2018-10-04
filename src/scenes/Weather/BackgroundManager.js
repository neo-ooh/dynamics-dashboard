import React, { Component } from 'react'

import { defineMessages, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import Select from 'components/Select'

import api from 'library/api'

class BackgroundManager extends Component {
  constructor (props) {
    super(props)

    this.state = {
      province: '',
      city: '',
      period: '',
      support: '',
      showCities: false,
      provinces: [],
      cities: [],
    }
  }

  messages = defineMessages({
    editBackgrounds: {
      id: 'dynamics.weather.edit-backgrounds',
      description: 'Background manager title',
      defaultMessage: 'Edit Backgrounds',
    },
    province: {
      id: 'dynamics.weather.province',
      description: 'A canadian province',
      defaultMessage: 'Province',
    },
    city: {
      id: 'dynamics.weather.city',
      description: 'A city',
      defaultMessage: 'City',
    },
    period: {
      id: 'dynamics.weather.period',
      description: 'Period of day used by the weather',
      defaultMessage: 'Time of day',
    },
    morning: {
      id: 'dynamics.weather.period.morning',
      description: 'Morning period of the day',
      defaultMessage: 'Morning',
    },
    day: {
      id: 'dynamics.weather.period.day',
      description: 'When-the-sun-has-risen-up period of the day',
      defaultMessage: 'Day',
    },
    dusk: {
      id: 'dynamics.weather.period.dusk',
      description: 'dusk period of the day',
      defaultMessage: 'Dusk',
    },
    night: {
      id: 'dynamics.weather.period.night',
      description: 'Night period of the day',
      defaultMessage: 'Night',
    },
    selectionMethod: {
      id: 'dynamics.weather.background-selection',
      description: 'Selection method used to select a background by the dynamic',
      defaultMessage: 'Selection method',
    },
    selectionMethodWeather: {
      id: 'dynamics.weather.background-selection.weather',
      description: 'Selecting the background using the current weather',
      defaultMessage: 'English',
    },
    selectionMethodRandom: {
      id: 'dynamics.weather.background-selection.random',
      description: 'Selecting the background randomly',
      defaultMessage: 'Random',
    },
    newBrunswick: {
      id: 'dynamics.weather.province.new-brunswick',
      description: 'Canadian province: New Brunswick',
      defaultMessage: 'New Brunswick',
    },
    labrador: {
      id: 'dynamics.weather.province.labrador',
      description: 'Canadian province: Newfoundland and Labrador',
      defaultMessage: 'Newfoundland and Labrador',
    },
    princeEdward: {
      id: 'dynamics.weather.province.prince-edward',
      description: 'Canadian province: Prince Edward Island',
      defaultMessage: 'Prince Edward Island',
    },
    novaScotia: {
      id: 'dynamics.weather.province.novia-scotia',
      description: 'Canadian province: Nova Scotia',
      defaultMessage: 'Nova Scotia',
    },
    quebec: {
      id: 'dynamics.weather.province.quebec',
      description: 'Canadian province: Quebec',
      defaultMessage: 'Quebec',
    },
    ontario: {
      id: 'dynamics.weather.province.ontario',
      description: 'Canadian province: Ontario',
      defaultMessage: 'Ontario',
    },
    manitoba: {
      id: 'dynamics.weather.province.manitoba',
      description: 'Canadian province: Manitoba',
      defaultMessage: 'Manitoba',
    },
    saskatchewan: {
      id: 'dynamics.weather.province.saskatchewan',
      description: 'Canadian province: Saskatchewan',
      defaultMessage: 'Saskatchewan',
    },
    alberta: {
      id: 'dynamics.weather.province.alberta',
      description: 'Canadian province: Alberta',
      defaultMessage: 'Alberta',
    },
    britishColumbia: {
      id: 'dynamics.weather.province.british-columbia',
      description: 'Canadian province: British-Columbia',
      defaultMessage: 'Colombie-Britannique',
    },
    allProvinces: {
      id: 'dynamics.weather.province.all',
      description: 'Canadian province: All of them',
      defaultMessage: 'All',
    },
    allCities: {
      id: 'dynamics.weather.cities.all',
      description: 'Province cities: All of them',
      defaultMessage: 'All',
    },
  })

  provinces = [
    { value: 'PE', label: this.props.intl.formatMessage(this.messages.princeEdward) },
    { value: 'NL', label: this.props.intl.formatMessage(this.messages.labrador) },
    { value: 'NB', label: this.props.intl.formatMessage(this.messages.newBrunswick) },
    { value: 'NS', label: this.props.intl.formatMessage(this.messages.novaScotia) },
    { value: 'QC', label: this.props.intl.formatMessage(this.messages.quebec) },
    { value: 'ON', label: this.props.intl.formatMessage(this.messages.ontario) },
    { value: 'MB', label: this.props.intl.formatMessage(this.messages.manitoba) },
    { value: 'SK', label: this.props.intl.formatMessage(this.messages.saskatchewan) },
    { value: 'AB', label: this.props.intl.formatMessage(this.messages.alberta) },
    { value: 'BC', label: this.props.intl.formatMessage(this.messages.britishColumbia) },
  ]

  onProvinceChange = province => {
    this.setState({ showCities: province !== '-' })
  }

  sortAlphabetically = (a, b) => a.label < b.label ? -1 : 1

  componentDidMount () {
    // Sort provinces
    this.provinces.sort(this.sortAlphabetically)
    this.provinces.unshift({ value: '-', label: this.props.intl.formatMessage(this.messages.allProvinces) })

    // Retrieve cities
    api.get('/')
  }

  render () {
    const cities = this.state.cities.slice(0)
    cities.sort(this.sortAlphabetically)
    cities.unshift({ value: '-', label: this.props.intl.formatMessage(this.messages.allCities) })

    return (
      <section className="content-column">
        <Link to="/dynamic/weather/"
          className="nav-back-upper-title">
          <span className="nav-back-arrow">&lt;</span>
          Weather Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(this.messages.editBackgrounds) }</h1>
        <Select
          label={ this.props.intl.formatMessage(this.messages.province) }
          options={ this.provinces }
          onChange={ this.onProvinceChange }/>
        { this.state.showCities && (
          <Select
            label={ this.props.intl.formatMessage(this.messages.city) }
            options={ cities }
          />
        ) }
      </section>
    )
  }
}

export default injectIntl(BackgroundManager)
