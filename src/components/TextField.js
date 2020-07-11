import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

class TextField extends Component {
  componentDidMount() {
    this.props.focus && this.input.focus()
  }

  onKeyPress = e => {
    if(e.key === 'Enter')
      this.props.onEnter()
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
          onKeyPress={ this.onKeyPress }
          ref={(input) => { this.input = input; }} />
      </div>
    )
  }
}

TextField.defaultProps = {
  onEnter: () => {}
}

export default TextField
