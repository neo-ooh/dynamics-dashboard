import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import messages from 'library/messages'

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
        className=""
        activeClassName="on-drag"
        accept={['image/jpeg']}
        onDrop={ this.onDrop }
        disabled={this.props.uploading}
      >
        {({getRootProps, getInputProps}) => (
          <div className="weather-background-card-placeholder" {...getRootProps()}>
            <div className="weather-background-card-placeholder-background"
                 style={ { backgroundImage: 'url(' + parentBackground + ')' } }
                 {...getInputProps()}/>
            <span className="weather-background-card-placeholder-label">
              { this.props.uploading
                ? this.props.intl.formatMessage(messages.weather.uploading)
                : this.props.intl.formatMessage(messages.weather.dropImage) }
            </span>
          </div>
        )}
      </DropZone>
    )
  }
}

EmptyBackgroundCard.defaultProps = {
  onUpload: () => {}
}

export default injectIntl(EmptyBackgroundCard)
