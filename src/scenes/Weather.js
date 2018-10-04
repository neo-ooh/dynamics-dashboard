import React, { Component } from 'react'
import BackgroundManager from './Weather/BackgroundManager'
import Index from './Weather/Index'
import GenerateURL from './Weather/GenerateURL'

import { injectIntl } from 'react-intl'
import { Switch, Route } from 'react-router-dom'

class Weather extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Switch>
        <Route path="/dynamic/weather/generate-url" component={GenerateURL} />
        <Route path="/dynamic/weather/backgrounds" component={BackgroundManager} />
        <Route component={Index} />
      </Switch>
    )
  }
}

export default injectIntl(Weather)
