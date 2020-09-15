import * as functions from 'firebase-functions';
import { profileTrigger } from './profile/profile.trigger';

import { server } from './server';

export const api = functions.https.onRequest(server);

export const createProfile = functions.auth
  .user()
  .onCreate(profileTrigger.createProfile);
