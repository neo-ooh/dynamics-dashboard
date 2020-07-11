import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter } from 'react-router-dom'

//
// LOCALIZATIONS
import { IntlProvider } from 'react-intl'
import frenchMessages from './assets/locales/fr-CA'
import englishMessages from './assets/locales/en-CA'

// ENV
import { config } from 'dotenv'
config()

const messages = {
  'fr-fr': frenchMessages,
  'en-ca': englishMessages,
}

//
// GO REACT

const locale = navigator.language in messages ? navigator.language : 'en-ca'

ReactDOM.render(
  <IntlProvider
    locale={ navigator.language }
    messages={messages[locale]}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </IntlProvider>, document.getElementById('root'))
registerServiceWorker()
