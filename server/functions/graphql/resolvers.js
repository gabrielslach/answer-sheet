const firebase = require('firebase-admin');

const db = firebase.firestore();

const addUser = require('./resolvers/addUser.mutation');
const addSubmission = require('./resolvers/addSubmission.mutation');
const addSheet = require('./resolvers/addSheet.mutation');

const getUser = require('./resolvers/getUser.query');
const getCardDeck = require('./resolvers/getCardDeck.query');
const getTeachers = require('./resolvers/getTeachers.query');
const getSections = require('./resolvers/getSections.query');
const getActivities = require('./resolvers/getActivities.query');
const getActivitiesOfTeacher = require('./resolvers/getActivitiesOfTeacher.query');
const getSubmissions = require('./resolvers/getSubmissions.query');

const Query = {
    getUser: getUser(db),
    getCardDeck: getCardDeck(db),
    getTeachers: getTeachers(db),
    getSections: getSections(db),
    getActivities: getActivities(db),
    getActivitiesOfTeacher: getActivitiesOfTeacher(db),
    getSubmissions: getSubmissions(db)
};

const Mutation = {
    addUser: addUser(db),
    addSubmission: addSubmission(db),
    addSheet: addSheet(db),
};

const miscResolvers = {
    Card: {
        CorrectAnswer: (cardObj,_,context) => {
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