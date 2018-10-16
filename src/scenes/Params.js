import React, { Component } from 'react'

import { injectIntl } from 'react-intl'
import { Route, Switch } from 'react-router-dom'

import APIKeysList from './Params/APIKeysList'
import APIKeyEditor from './Params/APIKeyEditor'

class Params extends Component {
  render () {
    return (
      <Switch>
        <Route path="/params/api-keys/:keyID" component={APIKeyEditor} />
        <Route path="/params/api-keys" component={APIKeysList} />
      </Switch>
    )
  }
}

export default injectIntl(Params)
