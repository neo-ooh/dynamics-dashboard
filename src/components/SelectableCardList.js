import React, { Component } from 'react'
import uuid from 'uuid/v4'
import Card from 'components/Card'

class SelectableCardList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: uuid(),
      selected: this.props.default || (this.props.multiple ? [] : this.props.items[0].value)
    }
  }

  onChange = e => {
    let selected = null
    if(this.props.multiple) {
      if(e.target.checked) {
        selected = this.state.selected
        selected.push(e.target.value)
      } else {
        // eslint-disable-next-line
        selected = this.state.selected.filter(el => el != e.target.value)
      }
    } else {
      selected = e.target.value
    }

    this.setState({ selected: selected }, () => {
      this.props.onChange(this.state.selected)
    })
  }

  render () {
    return (
      <div className="selectable-card-list">
        <div className="selectable-card-list-label">{ this.props.label }</div>
        <div className="selectable-card-list-items">
          { this.props.items.map(({ value, label }, index) => {
            const itemID = 'item-' + this.state.id + '-' + value
            const checked = this.props.multiple ? this.state.selected.includes(value) : value === this.state.selected
            return (
              <div className="selectable-card-radio-ensemble" key={itemID}>
                <input
                  type={this.props.multiple ? 'checkbox' : 'radio'}
                  name={ 'list-' + this.state.id }
                  value={ value }
                  id={ itemID }
                  className="selectable-card-input"
                  onChange={ this.onChange }
                  defaultChecked={ checked }/>
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
  items: [],
  multiple: false
}


export default SelectableCardList
