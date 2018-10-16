import { defineMessages } from 'react-intl'

export default defineMessages({
  params: {
    id: 'dynamics.params.params',
    description: 'Title of the parameters section on the home page',
    defaultMessage: 'Params',
  },
  apiKeys: {
    id: 'dynamics.params.keys',
    description: 'API keys',
    defaultMessage: 'Keys',
  },
  newAPIKey: {
    id: 'dynamics.params.keys.new',
    description: 'New API keys button label',
    defaultMessage: 'New key',
  },
  APIKeyName: {
    id: 'dynamics.params.keys.name',
    description: 'API keys name',
    defaultMessage: 'Key name',
  },
  cancel: {
    id: 'dynamics.params.keys.cancel',
    description: 'Cancel something',
    defaultMessage: 'Cancel',
  },
  create: {
    id: 'dynamics.params.create',
    description: 'Create something',
    defaultMessage: 'Create',
  },
  save: {
    id: 'dynamics.params.save',
    description: 'Save somthing',
    defaultMessage: 'Save',
  },
  delete: {
    id: 'dynamics.params.delete',
    description: 'Delete something',
    defaultMessage: 'Delete',
  },
  APIKeyTitleName: {
    id: 'dynamics.params.keys.titleName',
    description: 'Name of the key with \'key\' attached',
    defaultMessage: '{name} API key',
  },
  revokeAPIKeyTitle: {
    id: 'dynamics.params.keys.revokeTitle',
    description: 'Revoke the API Key title',
    defaultMessage: 'Revoke the key',
  },
  revokeAPIKeyText: {
    id: 'dynamics.params.keys.revokeText',
    description: 'Revoke the API Key description',
    defaultMessage: 'Revoking a key will prevent any further request made to the api using it to be sent informations.\n This cannot be undone.',
  },
})
