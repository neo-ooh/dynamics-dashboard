import React, { Component } from 'react'
import { defineMessages, injectIntl } from 'react-intl'

import api from 'library/api'
import weatherList from 'library/weatherList'
import BackgroundCard from './BackgroundCard'

class BackgroundsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selection: '',
      backgrounds: null
    }
  }

  componentDidUpdate(prevProps) {
    if(JSON.stringify(this.props) === JSON.stringify(prevProps)) return

    this.setState({
      backgrounds: null
    })

    this.getBackgrounds();
  }

  componentDidMount() {
    this.setState({
      backgrounds: null
    })

    this.getBackgrounds();
  }

  getBackgrounds = () => {

    api.get('/dynamics/weather/backgrounds', {
      country: this.props.country,
      province: this.props.province,
      city: this.props.city,
      period: this.props.period,
      support: this.props.support
    }).then(response => {
      if(response === null) return
      this.props.onSelectionMethodUpdate(response.selection)

      this.setState({
        selection: response.selection,
        backgrounds: response.backgrounds,
      })
    })
  }

  onCardUpdate = (index, newData) => {
    let backgrounds = this.state.backgrounds
    backgrounds[index] = newData
    this.setState({
      backgrounds: backgrounds
    })
  }

  render () {
    return this.state.selection === 'WEATHER' ? this.renderByWeather() : this.renderByCollection()
  }

  renderByWeather () {
    if(this.state.backgrounds === null) return null

    return (
      <div className="background-list-container">
        { weatherList.map((weather, index) => {
          let bckgIndex = this.state.backgrounds.findIndex(background => background.weather === weather)
          const background = bckgIndex === -1 ? null : this.state.backgrounds[bckgIndex]
          bckgIndex = bckgIndex === -1 ? index : bckgIndex

          return <BackgroundCard
            label={this.props.intl.formatMessage(BackgroundsList.messages[weather])}
            key={index + background}
            background={background}
            country={this.props.country}
            province={this.props.province}
            city={this.props.city}
            period={this.props.period}
            support={this.props.support}
            weather={weather}
            onUpdate={this.onCardUpdate.bind(this, bckgIndex)}
            onDelete={this.getBackgrounds}
          />
        })}
      </div>
    )
  }

  renderByCollection () {
    const newBackgroundIndex = this.state.backgrounds ? this.state.backgrounds.length : 0
    return (
      <div className="background-list-container">
        { this.state.backgrounds &&
          this.state.backgrounds.map((background, index) => {
          return <BackgroundCard
            label=""
            key={index + background}
            background={background}
            country={this.props.country}
            province={this.props.province}
            city={this.props.city}
            period={this.props.period}
            support={this.props.support}
            weather={'-'}
            onUpdate={this.onCardUpdate.bind(this, index)}
            onDelete={this.getBackgrounds}
          />
        })}
        <BackgroundCard
          label=""
          key="add-background"
          background={null}
          country={this.props.country}
          province={this.props.province}
          city={this.props.city}
          period={this.props.period}
          support={this.props.support}
          weather={'-'}
          onUpdate={this.onCardUpdate.bind(this, newBackgroundIndex)}
          onDelete={this.getBackgrounds}
        />
      </div>
    )
  }
}

BackgroundsList.messages = defineMessages({
  'cloudy': {
    id: 'dynamics.weather.cloudy',
    description: 'Cloudy weather',
    defaultMessage: 'Cloudy',
  },
  'fog': {
    id: 'dynamics.weather.fog',
    description: 'Foggy weather',
    defaultMessage: 'Fog',
  },
  'heavy-rain': {
    id: 'dynamics.weather.heavy-rain',
    description: 'Heavy rain weather',
    defaultMessage: 'Heavy rain',
  },
  'mostly-cloudy': {
    id: 'dynamics.weather.mostly-cloudy',
    description: 'Mostly cloudy weather',
    defaultMessage: 'Mostly Cloudy',
  },
  'mostly-sunny': {
    id: 'dynamics.weather.mostly-sunny',
    description: 'Mostly sunny weather',
    defaultMessage: 'Mostly Sunny',
  },
  'partly-sunny': {
    id: 'dynamics.weather.partly-sunny',
    description: 'Partly sunny weather',
    defaultMessage: 'Partly sunny',
  },
  'rain-and-sun': {
    id: 'dynamics.weather.rain-and-sun',
    description: 'Rain and sun weather',
    defaultMessage: 'Rain and sun',
  },
  'rain': {
    id: 'dynamics.weather.rain',
    description: 'Rainny weather',
    defaultMessage: 'Rain',
  },
  'snow-and-sun': {
    id: 'dynamics.weather.snow-and-sun',
    description: 'Snow and sun weather',
    defaultMessage: 'Snow and sun',
  },
  'snow': {
    id: 'dynamics.weather.snow',
    description: 'Snow weather',
    defaultMessage: 'Snow',
  },
  'storm-clouds': {
    id: 'dynamics.weather.storm-clouds',
    description: 'Storm clouds weather',
    defaultMessage: 'Storm clouds',
  },
  'sunny': {
    id: 'dynamics.weather.sunny',
    description: 'Sunny weather',
    defaultMessage: 'Sunny',
  },
  'thunderstorms': {
    id: 'dynamics.weather.thunderstorms',
    description: 'Thunderstorms weather',
    defaultMessage: 'Thunderstorms',
  },
})

export default injectIntl(BackgroundsList)
