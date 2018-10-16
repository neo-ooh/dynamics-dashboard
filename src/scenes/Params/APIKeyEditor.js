import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'
import api from 'library/api'
import { withRouter } from 'react-router-dom'

import { Link } from 'react-router-dom'
import SelectableCardList from 'components/SelectableCardList'
import Button from 'components/Button'

class APIKeyEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: null,
      dynamics: []
    }
  }

  componentDidMount () {
    const keyID = this.props.match.params.keyID
    api.get('/keys/' + keyID).then(key => {
      if(key === null) return
      this.setState({
        key: key,
        dynamics: key.dynamics.map(dynamic => dynamic.id)
      })
    })
  }

  dynamics = [
    { label:'Weather', value: 1 }
  ]

  onDynamicUpdate = selected => {
    this.setState({
      dynamics: selected
    })
  }

  onSave = () => {
    api.put('/keys/' + this.state.key.id, {
      dynamics: this.state.dynamics,
      name: this.state.key.name
    }).then(response => {
      this.props.history.push('/params/api-keys')
    })
  }

  onDelete = () => {
    api.delete('/keys/' + this.state.key.id).then(response => {
      this.props.history.push('/params/api-keys')
    })
  }

  render () {
    if(this.state.key === null) return null
    return (
      <section className="content-column fixed-width" key="background-manager">
        <Link to="/params/api-keys"
              className="nav-back-upper-title">
          <span className="nav-back-arrow">&lt;</span>
          { this.props.intl.formatMessage(messages.params.apiKeys) }
        </Link>
        <h1>{ this.props.intl.formatMessage(messages.params.APIKeyTitleName, {name: this.state.key.name}) }</h1>
        <SelectableCardList
          label={this.props.intl.formatMessage(messages.app.dynamics)}
          onChange={this.onDynamicUpdate}
          default={this.state.dynamics}
          items={this.dynamics}
          multiple
        />
        <div className="button-row right">
          <Button
            value={ this.props.intl.formatMessage(messages.params.cancel) }
            onClick={ () => { this.props.history.push('/params/api-keys') } } />
          <Button
            value={ this.props.intl.formatMessage(messages.params.save) }
            onClick={ this.onSave }
            primary />
        </div>
        <h1>{ this.props.intl.formatMessage(messages.params.revokeAPIKeyTitle) }</h1>
        <p className="text-zone">
          { this.props.intl.formatMessage(messages.params.revokeAPIKeyText) }
        </p>
        <div className="button-row right">
          <Button
            value={ this.props.intl.formatMessage(messages.params.delete) }
            onClick={ this.onDelete } />
        </div>
      </section>
    )
  }
}

export default withRouter(injectIntl(APIKeyEditor))
