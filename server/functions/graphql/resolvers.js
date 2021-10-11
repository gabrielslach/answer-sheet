const firebase = require('firebase-admin');

const db = firebase.firestore();

const addUser = require('./resolvers/addUser.mutation');
const addSubmission = require('./resolvers/addSubmission.mutation');
const addSheet = require('./resolvers/addSheet.mutation');
const login = require('./resolvers/login.query');

const Query = {
    login: login(db)
};

const Mutation = {
    addUser: addUser(db),
    addSubmission: addSubmission(db),
    addSheet: addSheet(db)
};

module.exports = {
    Query, 
    Mutation
};