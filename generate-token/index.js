var admin = require('firebase-admin');
var serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const uid = 'some_uid';

admin.auth().createCustomToken(uid)
.then((token) => {
    console.log(`Bearer ${token}`);
}).catch((error) => {
    console.log('Error creating token', error);
});
