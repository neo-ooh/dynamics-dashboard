import axios from 'axios'

class Api {
  _userToken = '-'
  _errorCallback = () => {}
  _unauthorizedCallback = () => {}

  get = url => {
    return this._send({
      url: process.env.REACT_APP_API_URL + url,
      method: 'GET',
      headers: {
        'Authorization': this._userToken,
      },
    })
  }

  post = (url, params) => {
    return this._send({
      url: process.env.REACT_APP_API_URL + url,
      method: 'POST',
      headers: {
        'Authorization': this._userToken,
      },
      data: params
    })
  }

  _send = (options) => {
    return axios(options).then(this._postReceive).catch(this._onError)
  }

  /**
   * Performs actions using the response headers.
   * Returns the response content (.data)
   * @param response
   */
  _postReceive = response => {
    return response.data.content
  }

  _onError = (error) => {
    const response = error.response || {}

    if (response.status == '401') {
      this._unauthorizedCallback()
      return null
    }

    let errorMessage = ''

    if ('data' in response && 'content' in response.data) {
      errorMessage = response.data.content.message

      if ('errors' in response.data.content) {
        errorMessage += '\n'
        for (error in response.data.content.errors) {
          errorMessage += '\n' + error
        }
      }
    } else if ('message' in error) {
      errorMessage = error.message
    } else {
      errorMessage = 'Fatal error'
    }

    this._errorCallback(errorMessage)

    return null
  }

  // AUXILIARY METHODS
  setErrorCallback = handler => {
    this._errorCallback = (typeof handler === 'function') ? handler : this._onError
  }

  setUnauthorizedCallback = handler => {
    this._unauthorizedCallback = (typeof handler === 'function') ? handler : () => {}
  }

  setUserToken = token => {
    this._userToken = token
  }
}

// Exports
export default new Api()
