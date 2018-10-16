import React, { Component } from 'react'
import messages from 'library/messages'

import BigIconCard from '../components/Cards/BigIconCard'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render () {
    return (
      <section className="content-column no-sidebar">
        <h1>{ this.props.intl.formatMessage(messages.app.dynamics) }</h1>
        <div className="big-card-ensemble">
          { this.props.dynamics.map(dynamic =>
            <Link to={'/dynamic/' + dynamic + '/' } key={dynamic}>
              <BigIconCard icon={dynamic} label={dynamic}/>
            </Link>
          )}
        </div>
        <h1>{ this.props.intl.formatMessage(messages.params.params) }</h1>
        <div className="big-card-ensemble">
          <Link to="/params/api-keys">
            <BigIconCard icon="key" label={ this.props.intl.formatMessage(messages.params.apiKeys) } />
          </Link>
        </div>
      </section>
    )
  }
}

export default injectIntl(Index)
