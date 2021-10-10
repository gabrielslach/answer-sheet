const functions = require('firebase-functions');
const firebase = require('firebase-admin');

let firebaseConfig = functions.config().firebase;
firebase.initializeApp(firebaseConfig);

const graphql = require('./graphql');
exports.app = functions.https.onRequest(graphql);