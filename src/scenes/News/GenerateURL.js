import React, { Component } from 'react'
import SelectableCardList from 'components/SelectableCardList'
import Card from 'components/Card'
import { Link } from 'react-router-dom'
import Select from 'components/Select'

import api from 'library/api'
import messages from 'library/messages'

import { injectIntl } from 'react-intl'
import copy from 'copy-to-clipboard'

class GenerateURL extends Component {
  constructor (props) {
    super(props)

    this.state = {
      availableCategories: {},
      categories: {},
      apiKey: '',
      design: '',
      keys: []
    }
  }

  componentDidMount () {
    api.get('/dynamics/news/categories').then(rawCategories => {
      let categories = {}

      rawCategories.forEach(cat => {
        if(!categories[cat.locale]) {
          categories[cat.locale] = {}
        }

        categories[cat.locale][cat.id] = cat.name
      })

      this.setState({
        availableCategories: categories
      })
    })

    api.get('/keys').then(keys => {
      if (keys === null) return

      const formattedKeys = keys.filter(key =>
        key.dynamics.filter(dynamic =>
          dynamic.slug === 'news').length > 0)
        .map(key => ({
          label: key.name,
          value: key.key
        }))

      this.setState({
        keys: formattedKeys,
        apiKey: formattedKeys.length > 0 ? formattedKeys[0].value : ''
      })
    })
  }

  onCategoriesChanges = (lang, categories) => {
    let cats = this.state.categories
    cats[lang] = categories
    this.setState({ categories: cats })
  }

  onAPIKeyChanges = newKey => {
    this.setState({ apiKey: newKey })
  }

  onDesignChanges = newDesign=> {
    this.setState({ design: newDesign })
  }

  designs = [
    { value: '', label: this.props.intl.formatMessage(messages.weather.autoLanguage) },
    { value: 'DCA', label: 'DCA' },
    { value: 'FCL', label: 'FCL' },
    { value: 'PMP', label: 'Pompe Media Portrait' },
  ]

  generateURL = () => {
    return process.env.REACT_APP_NEWS_URL + '/?categories=' + [].concat(...Object.values(this.state.categories)).join(',') + (this.state.design && '&design=' + this.state.design) + '&key=' + this.state.apiKey
  }

  copyURL = () => {
    copy(this.generateURL())
  }

  render () {
    return (
      <section className="content-column">
        <Link to="/dynamic/news/" className="nav-back-upper-title">
          <span className="nav-back-arrow" >&lt;</span>
          News Dynamic
        </Link>
        <h1>{ this.props.intl.formatMessage(messages.news.generateURL) }</h1>
        { Object.entries(this.state.availableCategories).map(([lang, categories]) => (
          <SelectableCardList
            label={ this.props.intl.formatMessage(messages.news['categories_' + lang]) }
            items={ Object.entries(categories).map(([catID, catName]) => ({value: catID, label: catName})) }
            onChange={this.onCategoriesChanges.bind(this, lang)}
            key={ lang }
            multiple
            selectAllShortcut/>
        ))}
        <SelectableCardList
          label={ this.props.intl.formatMessage(messages.app.design) }
          items={ this.designs }
          onChange={this.onDesignChanges}/>
        <Select
          label={ this.props.intl.formatMessage(messages.weather.APIKey) }
          options={ this.state.keys }
          onChange={this.onAPIKeyChanges}/>
        <h5 className="jumbo-card-upper-title">
          { this.props.intl.formatMessage(messages.weather.generatedURL) }
        </h5>
        <Card
          label={this.generateURL()}
          type="card-jumbo-size"
          onClick={this.copyURL}
        />
      </section>
    )
  }
}

export default injectIntl(GenerateURL)
