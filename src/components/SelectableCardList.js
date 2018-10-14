import React, { Component } from 'react'
import uuid from 'uuid/v4'
import Card from 'components/Card'

class SelectableCardList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: uuid(),
      selected: this.props.default || this.props.items[0].value
    }
  }

  onChange = e => {
    this.props.onChange(e.target.value)
    this.setState({ selected: e.target.value })
  }

  render () {
    return (
      <div className="selectable-card-list">
        <div className="selectable-card-list-label">{ this.props.label }</div>
        <div className="selectable-card-list-items">
          { this.props.items.map(({ value, label }, index) => {
            const itemID = 'item-' + this.state.id + '-' + value
            return (
              <div className="selectable-card-radio-ensemble" key={itemID}>
                <input
                  type="radio"
                  name={ 'list-' + this.state.id }
                  value={ value }
                  id={ itemID }
                  className="selectable-card-radio-input"
                  onChange={ this.onChange }
                  defaultChecked={ value === this.state.selected }/>
                <label
                  htmlFor={ itemID }
                  className="selectable-card-label">
                  <Card
                    type="card-radio-list"
                    label={ label } />
                </label>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
}

SelectableCardList.defaultProps = {
  onChange: () => {},
  items: []
}


export default SelectableCardList
