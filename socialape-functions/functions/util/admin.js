const serviceAccount = require('../key/serviceAccountKey.json');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "socialize-4fd6b.appspot.com"
});
const db = admin.firestore();

module.exports = { admin, db }