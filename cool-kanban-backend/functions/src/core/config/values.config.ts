import * as functions from 'firebase-functions';

export const getConfigValue = (): any => {
  let config = require('../../../.runtimeconfig.json');

  if (Object.keys(functions.config()).length) {
    config = functions.config();
  }

  return config;
};
