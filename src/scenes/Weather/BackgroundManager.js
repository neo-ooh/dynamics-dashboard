import React, { Component } from 'react'

import { defineMessages, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import Select from 'components/Select'
import Vhr from 'components/Vhr'

import api from 'library/api'
import ToggleSwitch from 'components/ToggleSwitch'
import BackgroundsList from './BackgroundManager/BackgroundsList'

class BackgroundManager extends Component {
  constructor (props) {
    super(props)

    this.state = {
      country: 'CA',
      province: '--',
      city: '-',
      period: 'MORNING',
      support: 'DCA',
      selection: '-',
      provinces: [],
      cities: [],
    }
  }

  provinces = [
    { value: 'PE', label: this.props.intl.formatMessage(BackgroundManager.messages.princeEdward) },
    { value: 'NL', label: this.props.intl.formatMessage(BackgroundManager.messages.labrador) },
    { value: 'NB', label: this.props.intl.formatMessage(BackgroundManager.messages.newBrunswick) },
    { value: 'NS', label: this.props.intl.formatMessage(BackgroundManager.messages.novaScotia) },
    { value: 'QC', label: this.props.intl.formatMessage(BackgroundManager.messages.quebec) },
    { value: 'ON', label: this.props.intl.formatMessage(BackgroundManager.messages.ontario) },
    { value: 'MB', label: this.props.intl.formatMessage(BackgroundManager.messages.manitoba) },
    { value: 'SK', label: this.props.intl.formatMessage(BackgroundManager.messages.saskatchewan) },
    { value: 'AB', label: this.props.intl.formatMessage(BackgroundManager.messages.alberta) },
    { value: 'BC', label: this.props.intl.formatMessage(BackgroundManager.messages.britishColumbia) },
  ]

  periods = [
    { value: 'MORNING', label: this.props.intl.formatMessage(BackgroundManager.messages.morning) },
    { value: 'DAY', label: this.props.intl.formatMessage(BackgroundManager.messages.day) },
    { value: 'DUSK', label: this.props.intl.formatMessage(BackgroundManager.messages.dusk) },
    { value: 'NIGHT', label: this.props.intl.formatMessage(BackgroundManager.messages.night) },
  ]

  supports = [
    { value: 'DCA', label: 'DCA' },
    { value: 'FCL', label: 'FCL' },
  ]

  selectionMethods = [
    { value: 'WEATHER', label: this.props.intl.formatMessage(BackgroundManager.messages.selectionMethodWeather) },
    { value: 'RANDOM', label: this.props.intl.formatMessage(BackgroundManager.messages.selectionMethodRandom) },
  ]

  onProvinceChange = province => {
    this.setState({
      province: province,
      city: '-',
    })
  }

  onCityChange = city => {
    if(city !== '+') return this.setState({
      city: city
    })


  }

  onPeriodChange = period => {
    this.setState({
      period: period
    })
  }

  onSupportChange = support => {
    this.setState({
      support: support
    })
  }

  onSelectionMethodChange = newMethod => {
    api.post('/dynamics/weather/backgrounds/selection', {
      country: this.state.country,
      province: this.state.province,
      city: this.state.city,
      selection: newMethod,
    }).then((response) => this.setState({
      selection: newMethod
    }))
  }

  onSelectionMethodUpdate = newMethod => {
    this.setState({
      selection: newMethod
    })
  }

  sortAlphabetically = (a, b) => a.label < b.label ? -1 : 1

  componentDidMount () {
    // Sort provinces
    this.provinces.sort(this.sortAlphabetically)
    this.provinces.unshift({ value: '--', label: this.props.intl.formatMessage(BackgroundManager.messages.allProvinces) })

    // Retrieve cities
    api.get('/dynamics/weather/backgrounds/cities').then(resp => {
      if (resp === null || !resp.hasOwnProperty('cities')) return
      this.setState({ cities: resp.cities })
    })
  }

  render () {
    let cities = []
    if (this.state.province !== '--') {
      cities = this.state.cities
        .filter(city => city.province === this.state.province)
        .filter(city => city.city !== '-')
        .map(city => ({ value: city.city, label: city.city }))
      cities.sort(this.sortAlphabetically)
      cities.unshift({ value: '-', label: this.props.intl.formatMessage(BackgroundManager.messages.allCities) })
      cities.push({ value: '+', label: '+ ' + this.props.intl.formatMessage(BackgroundManager.messages.addCity) })
    }

    return (
      <section className="content-column">
        <Link to="/dynamic/weather/"
          className="nav-back-upper-title">
          <span className="nav-back-arrow">&lt;</span>
          Weather Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(BackgroundManager.messages.editBackgrounds) }</h1>
        <div className="filters">
          <Select
            label={ this.props.intl.formatMessage(BackgroundManager.messages.province) }
            options={ this.provinces }
            onChange={ this.onProvinceChange }
            width={225} />
          { this.state.province !== '--' && (
            <Select
              label={ this.props.intl.formatMessage(BackgroundManager.messages.city) }
              options={ cities }
              onChange={ this.onCityChange }
              width={175} />
          ) }
          <Vhr />
          <ToggleSwitch
            label={ this.props.intl.formatMessage(BackgroundManager.messages.selectionMethod) }
            items={ this.selectionMethods }
            onChange={ this.onSelectionMethodChange }
            selected={ this.state.selection }
          />
          <Select
            label={ this.props.intl.formatMessage(BackgroundManager.messages.period) }
            options={ this.periods }
            onChange={ this.onPeriodChange }
            width={ 125 }/>
          <Select
            label={ this.props.intl.formatMessage(BackgroundManager.messages.support) }
            options={ this.supports }
            onChange={ this.onSupportChange }
            width={ 125 }/>
        </div>
        <BackgroundsList
          country={this.state.country}
          province={this.state.province}
          city={this.state.city}
          period={this.state.period}
          support={this.state.support}
          selection={this.state.selection}
          onSelectionMethodUpdate={this.onSelectionMethodUpdate}
        />
      </section>
    )
  }
}

BackgroundManager.messages = defineMessages({
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
    defaultMessage: 'Weather',
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
  addCity: {
    id: 'dynamics.weather.cities.add',
    description: 'Province cities: Add a new city to the list',
    defaultMessage: 'Add',
  },
  support: {
    id: 'dynamics.weather.support',
    description: 'Neo support (DCA/FCL/LED/WAL)',
    defaultMessage: 'Support',
  },
})

export default injectIntl(BackgroundManager)
