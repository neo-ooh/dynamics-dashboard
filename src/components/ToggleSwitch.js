import React, { Component } from 'react'
import uuid from 'uuid/v4'

class ToggleSwitch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: uuid(),
      selected: this.props.selected || this.props.items.length > 0 ? this.props.items[0].value : null
    }
  }

  onChange = selectionItem => {
    if (selectionItem === this.state.selected) return

    this.props.onChange(selectionItem)
    this.setState({
      selected: selectionItem
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selected !== this.props.selected) {
      this.setState({
        selected: this.props.selected
      })
    }
  }

  render() {
    return (
      <div className="toggle-switch">
        <div className="toggle-switch-label">
          { this.props.label }
        </div>
        <div className="toggle-switch-input">
          <div
            className={'toggle-switch-item ' + (this.state.selected === this.props.items[0].value? 'selected' : '')}
            onClick={this.onChange.bind(this, this.props.items[0].value)}>
            { this.props.items[0].label }
          </div>
          <div
            className={'toggle-switch-item ' + (this.state.selected === this.props.items[1].value ? 'selected' : '')}
            onClick={this.onChange.bind(this, this.props.items[1].value)}>
            { this.props.items[1].label }
          </div>
        </div>
      </div>
    )
  }
}

ToggleSwitch.defaultProps = {
  onChange: () => {},
  items: [{}, {}]
}

export default ToggleSwitch
