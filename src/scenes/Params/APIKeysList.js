import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'
import messages from 'library/messages'
import api from 'library/api'

import DetailedListCard from 'components/Cards/DetailedListCard'
import AddAPIKeyWindow from './AddAPIKeyWindow'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

class APIKeysList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      keys: [],
      addKey: false
    }
  }

  componentDidMount () {
    this.retrieveKeys()
  }

  retrieveKeys () {
    api.get('/keys').then(keys => {
      if(!keys) return

      this.setState({
        keys: keys.sort(this.sortAlphabetically)
      })
    })
  }

  onNewKeyClicked = () => {
    this.setState({
      addKey: true
    })
  }

  onNewKeyExit = () => {
    this.setState({
      addKey: false
    })
  }

  sortAlphabetically = (a, b) => {
    return a.name > b.name
  }

  onNewKey = keyName => {
    api.post('/keys', { name: keyName }).then(newKey => {
      if(newKey === null) return

      this.props.history.push('/params/api-keys/' + newKey.id)
    })
  }

  render () {
    return [
      <section className="content-column" key="API-KEYS-LIST">
        <h1>
          { this.props.intl.formatMessage(messages.params.apiKeys) }
          <Button
            value={ this.props.intl.formatMessage(messages.params.newAPIKey) }
            onClick={this.onNewKeyClicked}
            flush={true}
          />
        </h1>
        <div className="">
          { this.state.keys.map(key => (
            <Link to={'api-keys/' + key.id} key={key.name}>
              <DetailedListCard
                label={key.name}
                sublabel={key.dynamics.map(dynamic => dynamic.name).join(', ')} />
            </Link>
          ))}
        </div>
      </section>,
      this.state.addKey &&
        <AddAPIKeyWindow
          onClose={this.onNewKeyExit}
          onAdd={this.onNewKey}
          key="add-key-window" />
    ]
  }
}

export default withRouter(injectIntl(APIKeysList))
