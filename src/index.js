import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter } from 'react-router-dom'

//
// LOCALIZATIONS
import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'
import en from 'react-intl/locale-data/en'
import frenchMessages from './assets/locales/fr_CA'
import englishMessages from './assets/locales/en_CA'

// ENV
import { config } from 'dotenv'
config()

const messages = {
  'fr-FR': frenchMessages,
  'en-CA': englishMessages,
}

addLocaleData([...fr, ...en])

//
// GO REACT

ReactDOM.render(
  <IntlProvider
    locale={ navigator.language }
    messages={messages[navigator.language]}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </IntlProvider>, document.getElementById('root'))
registerServiceWorker()
