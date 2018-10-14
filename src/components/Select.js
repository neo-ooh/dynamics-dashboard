import React, { Component } from 'react'

import { injectIntl } from 'react-intl'
import uuid from 'uuid/v4'

class Select extends Component {
  onChange = e => {
    this.props.onChange(e.target.value)
  }

  render () {
    const fieldID = 'select-' + uuid()
    return (
      <div className="select-field">
        <label
          className="select-field-label"
          htmlFor={ fieldID } >
          { this.props.label }
        </label>
        <select
          id={ fieldID }
          className="select-field-input"
          onChange={ this.onChange }
          style={{ width: this.props.width + 'px' }}
          value={this.props.value}>
          { this.props.options.map(({ value, label }) => {
            return (<option
              value={ value }
              key={ label + value } >
              { label }
            </option>)
          })
          }
        </select>
        <span className="select-field-caret" />
      </div>
    )
  }
}

Select.defaultProps = {
  width: 250
}

export default injectIntl(Select)
