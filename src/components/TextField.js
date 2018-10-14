import React, { Component } from 'react'
import uuid from 'uuid/v4'

class TextField extends Component {
  componentDidMount() {
    this.props.focus && this.input.focus()
  }
  render () {
    const fieldID = 'text-field-' + uuid()
    return (
      <div className="text-field">
        <label htmlFor="fieldID">
          { this.props.label || this.props.placeholder}
        </label>
        <input
          id={fieldID}
          type={ this.props.type || 'text' }
          className="text-field"
          value={ this.props.value }
          placeholder={ this.props.placeholder || this.props.label }
          onChange={ this.props.onChange }
          ref={(input) => { this.input = input; }} />
      </div>
    )
  }
}

export default TextField
