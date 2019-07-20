import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'
import Vhr from 'components/Vhr'
import uuid from 'uuid/v4'
import Card from 'components/Card'

class SelectableCardList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: uuid(),
      selected: this.props.default || (this.props.multiple ? [] : this.props.items[0].value),
      allSelected: false,
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

    this.setState({
      selected: selected,
      allSelected: false
    }, () => {
      this.props.onChange(this.state.selected)
    })
  }

  onSelectAllChange = e => {
    if(e.target.checked) {
      // User checked 'All'
      this.setState({
        selected: [],
        allSelected: true
      }, () =>
        this.props.onChange(this.props.items.map(({ value, label }) => value))
      )
      return
    }

    // User unchecked 'All'
    this.setState({
        selected: [],
        allSelected: false
      }, () =>
        this.props.onChange([])
    )
  }

  render () {
    return (
      <div className="selectable-card-list">
        <div className="selectable-card-list-label">{ this.props.label }</div>
        <div className="selectable-card-list-items">
          { this.props.multiple && this.props.selectAllShortcut && [
              <div className="selectable-card-radio-ensemble" key={ 'item-all-' + this.state.id }>
                <input
                  type="checkbox"
                  name={ 'list-' + this.state.id }
                  value={ '' }
                  id={ 'item-all-' + this.state.id }
                  className="selectable-card-input"
                  onChange={ this.onSelectAllChange }
                  checked={ this.state.allSelected }/>
                <label
                  htmlFor={ 'item-all-' + this.state.id }
                  className="selectable-card-label">
                  <Card
                    type="card-radio-list"
                    label={ this.props.intl.formatMessage(messages.app.selectAll) } />
                </label>
              </div>,
              <Vhr key="selectable-vhr"/>
            ]
          }
          { this.props.items.map(({ value, label }, index) => {
            const itemID = 'item-' + this.state.id + '-' + value
            // eslint-disable-next-line
            const checked = this.props.multiple ? this.state.selected.includes(value) : value == this.state.selected
            return (
              <div className="selectable-card-radio-ensemble" key={itemID}>
                <input
                  type={this.props.multiple ? 'checkbox' : 'radio'}
                  name={ 'list-' + this.state.id }
                  value={ value }
                  id={ itemID }
                  className="selectable-card-input"
                  onChange={ this.onChange }
                  checked={ checked } />
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
  multiple: false,
  selectAllShortcut: false
}


export default injectIntl(SelectableCardList)
