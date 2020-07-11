import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { injectIntl } from 'react-intl'

class DateField extends Component {
  onChange = e => {
    this.props.onChange(e)
  }

  render () {
    const fieldID = 'date-' + uuid()
    return (
      <div className="date-field">
        <label
          className="date-field-label"
          htmlFor={ fieldID } >
          { this.props.label }
        </label>
        <DatePicker
          id={ fieldID }
          customInput={<DateFieldInput />}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd h:mm aa"
          className="date-field-input"
          selected={this.props.value}
          onChange={ this.onChange } />
      </div>
    )
  }
}

DateField.defaultProps = {
  value: new Date(),
}

class DateFieldInput extends Component {
  render () {
    return (
      <button
        className="date-field-private-input"
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}

export default injectIntl(DateField)
