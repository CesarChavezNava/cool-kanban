import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const config = functions.config().firebase;
const app = admin.initializeApp(config);

const settings = { timestampsInSnapshots: true };
const db = admin.firestore();

const fs = admin.firestore;

db.settings(settings);

module.exports = {
  app,
  db,
  fs,
};

export { app, db, fs };
