import React, { Component } from 'react'
import BackgroundManager from './News/BackgroundManager'
import Index from './News/Index'
import GenerateURL from './News/GenerateURL'

import { injectIntl } from 'react-intl'
import { Switch, Route } from 'react-router-dom'

class News extends Component {
  render () {
    return (
      <Switch>
        <Route path="/dynamic/news/generate-url" component={GenerateURL} />
        <Route path="/dynamic/news/backgrounds" component={BackgroundManager} />
        <Route component={Index} />
      </Switch>
    )
  }
}

export default injectIntl(News)
