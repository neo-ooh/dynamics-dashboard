import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import api from 'library/api'

import BackgroundCard from './BackgroundCard'

class BackgroundsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      backgrounds: [],
      categories: [],
      rawCategories: []
    }
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(this.props) === JSON.stringify(prevProps)) return

    this.setState({
      categories: this.state.rawCategories.filter(cat => cat.locale === this.props.locale),
      backgrounds: [],
    }, this.getBackgrounds)
  }

  componentDidMount () {
    this.setState({
      backgrounds: [],
    })
    this.getBackgrounds().then(this.getCategories)
  }

  getCategories = () => {
    return api.get('/dynamics/news/categories').then(rawCategories => {
      this.setState({
        rawCategories: rawCategories,
        categories: rawCategories.filter(cat => cat.locale === this.props.locale)
      })
    })
  }

  getBackgrounds = () => {
    return api.get('/dynamics/news/backgrounds', {
      support: this.props.support,
      locale: this.props.locale,
    }).then(backgrounds => {
      this.setState({
        backgrounds: backgrounds,
      })
    })
  }

  onCardUpdate = (categoryID, newURL) => {
    let backgrounds = this.state.backgrounds
    backgrounds[categoryID] = newURL
    this.setState({
      backgrounds: backgrounds,
    })
  }

  render () {
    return (
      <div className="background-list-container">
        { this.state.categories.map(cat => {
          const filterBackgrounds = this.state.backgrounds.filter(bckg =>
            bckg.category.id === cat.id &&
            bckg.support === this.props.support &&
            bckg.locale === this.props.locale
          )

          const background = filterBackgrounds.length === 1 ? filterBackgrounds[0] : null

          return <BackgroundCard
            label={ cat.name }
            key={ cat.id }
            background={ background }
            category={ cat.id }
            support={ this.props.support }
            locale={ this.props.locale }
            onUpdate={ this.onCardUpdate.bind(this, cat.id) }
            onDelete={ this.getBackgrounds }
          />
        }) }
      </div>
    )
  }
}

export default injectIntl(BackgroundsList)
