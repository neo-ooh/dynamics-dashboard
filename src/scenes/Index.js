import React, { Component } from 'react'
import BigIconCard from '../components/Cards/BigIconCard'
import { Link } from 'react-router-dom'

import { defineMessages, injectIntl } from 'react-intl'

class Index extends Component {
  /* constructor (props) {
    super(props)
  } */

  // LOCALIZATION
  messages = defineMessages({
    dynamics: {
      id: 'dynamics.index.dynamics',
      description: 'Title of the dynamic section on the home page',
      defaultMessage: 'Dynamics',
    },
    params: {
      id: 'dynamics.index.params',
      description: 'Title of the parameters section on the home page',
      defaultMessage: 'Params',
    },
    keys: {
      id: 'dynamics.params.keys',
      description: 'API keys',
      defaultMessage: 'Keys',
    }
  })

  render () {
    return (
      <section className="content-column">
        <h1>{ this.props.intl.formatMessage(this.messages.dynamics) }</h1>
        <div className="big-card-ensemble">
          { this.props.dynamics.map(dynamic =>
            <Link to={'/dynamic/' + dynamic + '/' } key={dynamic}>
              <BigIconCard icon={dynamic} label={dynamic}/>
            </Link>
          )}
        </div>
        <h1>{ this.props.intl.formatMessage(this.messages.params) }</h1>
        <div className="big-card-ensemble">
          <Link to="/params/keys/">
            <BigIconCard icon="key" label={ this.props.intl.formatMessage(this.messages.keys) } />
          </Link>
        </div>
      </section>
    )
  }
}

export default injectIntl(Index)
