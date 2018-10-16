import React, { Component } from 'react'

import { injectIntl } from 'react-intl'
import messages from 'library/messages'
import api from 'library/api'

import BackgroundsList from './BackgroundManager/BackgroundsList'
import AddCityWindow from './BackgroundManager/AddCityWindow'
import ToggleSwitch from 'components/ToggleSwitch'
import { Link } from 'react-router-dom'
import Select from 'components/Select'
import Vhr from 'components/Vhr'

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
      addCity: false,
      lastCity: '-'
    }
  }

  provinces = [
    { value: 'PE', label: this.props.intl.formatMessage(messages.app.princeEdward) },
    { value: 'NL', label: this.props.intl.formatMessage(messages.app.labrador) },
    { value: 'NB', label: this.props.intl.formatMessage(messages.app.newBrunswick) },
    { value: 'NS', label: this.props.intl.formatMessage(messages.app.novaScotia) },
    { value: 'QC', label: this.props.intl.formatMessage(messages.app.quebec) },
    { value: 'ON', label: this.props.intl.formatMessage(messages.app.ontario) },
    { value: 'MB', label: this.props.intl.formatMessage(messages.app.manitoba) },
    { value: 'SK', label: this.props.intl.formatMessage(messages.app.saskatchewan) },
    { value: 'AB', label: this.props.intl.formatMessage(messages.app.alberta) },
    { value: 'BC', label: this.props.intl.formatMessage(messages.app.britishColumbia) },
  ]

  periods = [
    { value: 'MORNING', label: this.props.intl.formatMessage(messages.weather.morning) },
    { value: 'DAY', label: this.props.intl.formatMessage(messages.weather.day) },
    { value: 'DUSK', label: this.props.intl.formatMessage(messages.weather.dusk) },
    { value: 'NIGHT', label: this.props.intl.formatMessage(messages.weather.night) },
  ]

  supports = [
    { value: 'DCA', label: 'DCA' },
    { value: 'FCL', label: 'FCL' },
    { value: 'LED', label: 'LED' },
  ]

  selectionMethods = [
    { value: 'WEATHER', label: this.props.intl.formatMessage(messages.weather.selectionMethodWeather) },
    { value: 'RANDOM', label: this.props.intl.formatMessage(messages.weather.selectionMethodRandom) },
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

    this.setState({
      addCity: true,
      lastCity: this.state.city,
    })
  }

  onCityAddClose = () => {
    this.setState({
      addCity: false,
      city: this.state.lastCity,
    })
  }

  onCityAdd = cityName => {
    const cities = this.state.cities
    cities.push({
      city: cityName,
      province: this.state.province,
    })
    this.setState({
      addCity: false,
      cities: cities,
      city: cityName,
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
    this.provinces.unshift({ value: '--', label: this.props.intl.formatMessage(messages.weather.allProvinces) })

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
      cities.unshift({ value: '-', label: this.props.intl.formatMessage(messages.weather.allCities) })
      cities.push({ value: '+', label: '+ ' + this.props.intl.formatMessage(messages.weather.addCity) })
    }

    return [
      <section className="content-column" key="background-manager">
        <Link to="/dynamic/weather/"
          className="nav-back-upper-title">
          <span className="nav-back-arrow">&lt;</span>
          Weather Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(messages.weather.editBackgrounds) }</h1>
        <div className="filters">
          <Select
            label={ this.props.intl.formatMessage(messages.weather.province) }
            options={ this.provinces }
            onChange={ this.onProvinceChange }
            width={225}
            value={this.state.province} />
          { this.state.province !== '--' && (
            <Select
              label={ this.props.intl.formatMessage(messages.weather.city) }
              options={ cities }
              onChange={ this.onCityChange }
              width={175}
              value={this.state.city} />
          ) }
          <Vhr />
          <ToggleSwitch
            label={ this.props.intl.formatMessage(messages.weather.selectionMethod) }
            items={ this.selectionMethods }
            onChange={ this.onSelectionMethodChange }
            selected={ this.state.selection }
          />
          <Vhr />
          <Select
            label={ this.props.intl.formatMessage(messages.weather.period) }
            options={ this.periods }
            onChange={ this.onPeriodChange }
            width={ 125 }/>
          <Select
            label={ this.props.intl.formatMessage(messages.weather.support) }
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
      </section>,
      this.state.addCity && <AddCityWindow
        onClose={this.onCityAddClose}
        onAdd={this.onCityAdd}
        key="add-city-window"
      />
    ]
  }
}

export default injectIntl(BackgroundManager)
