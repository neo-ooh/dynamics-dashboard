import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'
import api from 'library/api'

import weatherList from 'library/weatherList'
import BackgroundCard from './BackgroundCard'

class BackgroundsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selection: '',
      location: {},
      backgrounds: null,
    }
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(this.props) === JSON.stringify(prevProps)) return

    this.setState({
      backgrounds: null,
    })

    this.getBackgrounds()
  }

  componentDidMount () {
    this.setState({
      backgrounds: null,
    })

    this.getBackgrounds()
  }

  getBackgrounds = () => {

    api.get('/dynamics/weather/backgrounds', {
      country: this.props.country,
      province: this.props.province,
      city: this.props.city,
      period: this.props.period,
      support: this.props.support,
    }).then(response => {
      if (response === null) return
      this.props.onSelectionMethodUpdate(response)

      this.setState({
        location: response.location,
        selection: response.selection,
        backgrounds: response.backgrounds,
      })
    })
  }

  onCardUpdate = (index, newData) => {
    let backgrounds = this.state.backgrounds
    backgrounds[index] = newData
    this.setState({
      backgrounds: backgrounds,
    })
  }

  render () {
    return this.state.selection === 'WEATHER' ? this.renderByWeather() : this.renderByCollection()
  }

  renderByWeather () {
    if (this.state.backgrounds === null) return null

    return (
      <div className="background-list-container">
        { weatherList.map((weather, index) => {
          let bckgIndex = this.state.backgrounds.findIndex(background => {
            if (background === undefined) return false
            return background.weather === weather
          })
          const background = bckgIndex === -1 ? null : this.state.backgrounds[bckgIndex]
          bckgIndex = bckgIndex === -1 ? this.state.backgrounds.length : bckgIndex

          return <BackgroundCard
            label={ this.props.intl.formatMessage(messages.weather[weather]) }
            key={ index + background }
            background={ background }
            location={ this.state.location }
            period={ this.props.period }
            support={ this.props.support }
            weather={ weather }
            onUpdate={ this.onCardUpdate.bind(this, bckgIndex) }
            onDelete={ this.getBackgrounds }
          />
        }) }
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
            key={ index + background }
            background={ background }
            location={ this.state.location }
            period={ this.props.period }
            support={ this.props.support }
            weather={ '-' }
            onUpdate={ this.onCardUpdate.bind(this, index) }
            onDelete={ this.getBackgrounds }
          />
        }) }
        <BackgroundCard
          label=""
          key="add-background"
          background={ null }
          location={ this.state.location }
          period={ this.props.period }
          support={ this.props.support }
          weather={ '-' }
          onUpdate={ this.onCardUpdate.bind(this, newBackgroundIndex) }
          onDelete={ this.getBackgrounds }
        />
      </div>
    )
  }
}

export default injectIntl(BackgroundsList)
