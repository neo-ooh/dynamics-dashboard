import React, { Component } from 'react'
import { defineMessages, injectIntl } from 'react-intl'

import DropZone from 'react-dropzone'

class EmptyBackgroundCard extends Component {
  onDrop = files => {
    if(files.length === 0) return
    files.forEach(file => window.URL.revokeObjectURL(file.preview))

    this.props.onUpload(files[0])
  }

  render () {
    const parentBackground = this.props.background !== null ? this.props.background.path : ''
    return (
      <DropZone
        disableClick
        className="weather-background-card-placeholder"
        activeClassName="on-drag"
        accept={['image/jpeg']}
        onDrop={ this.onDrop }
        disabled={this.props.uploading}
      >
        <div className="weather-background-card-placeholder-background"
             style={{backgroundImage: 'url(' + parentBackground + ')'}}/>
        <span className="weather-background-card-placeholder-label">
          { this.props.uploading
            ? this.props.intl.formatMessage(EmptyBackgroundCard.messages.uploading)
            : this.props.intl.formatMessage(EmptyBackgroundCard.messages.dropImage) }
        </span>
      </DropZone>
    )
  }
}

EmptyBackgroundCard.defaultProps = {
  onUpload: () => {}
}

EmptyBackgroundCard.messages = defineMessages({
  dropImage: {
    id: 'dynamics.weather.upload-background',
    description: 'Message to tell the user to drop a background here',
    defaultMessage: 'Drop a background here'
  },
  uploading: {
    id: 'dynamics.weather.uploading',
    description: 'Message to tell the user it\'s background is uploading',
    defaultMessage: 'Uploading'
  }
})

export default injectIntl(EmptyBackgroundCard)
