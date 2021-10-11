const firebase = require('firebase-admin');

const db = firebase.firestore();

const addUser = require('./resolvers/addUser.mutation');
const addSubmission = require('./resolvers/addSubmission.mutation');
const addSheet = require('./resolvers/addSheet.mutation');

const login = require('./resolvers/login.query');
const getCardDeck = require('./resolvers/getCardDeck.query');

const Query = {
    login: login(db),
    getCardDeck: getCardDeck(db)
};

const Mutation = {
    addUser: addUser(db),
    addSubmission: addSubmission(db),
    addSheet: addSheet(db)
};

const miscResolvers = {
    Card: {
        CorrectAnswer: (cardObj,_,context,info) => {
            const { CorrectAnswer } = cardObj;
            const { auth } = context;

            return auth === 'teacher'? CorrectAnswer : null;
        }
    }
}

module.exports = {
    Query, 
    Mutation,
    ...miscResolvers
};