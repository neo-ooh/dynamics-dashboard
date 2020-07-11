import axios from 'axios'

class Api {
  _userToken = '-'
  _errorCallback = () => {}
  _unauthorizedCallback = () => {}

  _http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  get = (url, params, ignorecache = true) => {
    const URLparams = params || {}
    const postfix = ignorecache ? '?timestamp='+new Date().getTime() : ''

    return this._send({
      url: url + postfix,
      method: 'GET',
      headers: {
        Authorization: this._userToken,
      },
      params: URLparams
    })
  }

  post = (url, data) => {
    return this._send({
      url: url,
      method: 'POST',
      headers: {
        'Authorization': this._userToken,
      },
      data: data
    })
  }

  put = (url, data) => {
    return this._send({
      url: url,
      method: 'PUT',
      headers: {
        'Authorization': this._userToken,
      },
      data: data
    })
  }

  delete = (url, params) => {
    return this._send({
      url: url,
      method: 'DELETE',
      headers: {
        'Authorization': this._userToken,
      },
      params: params || {}
    })
  }

  _send = (options) => {
    return this._http(options).then(this._postReceive).catch(this._onError)
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

    if (response.status === 401) {
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

    this._errorCallback(errorMessage, response.status)

    return null
  }

  // AUXILIARY METHODS
  setErrorCallback = handler => {
    this._errorCallback = (typeof handler === 'function') ? handler : this._onError
  }

  setUnauthorizedCallback = handler => {
    this._unauthorizedCallback = (typeof handler === 'function') ? handler : this._unauthorizedCallback
  }

  setUserToken = token => {
    this._userToken = token
  }
}

// Exports
export default new Api()
