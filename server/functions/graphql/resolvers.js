const firebase = require('firebase-admin');

const db = firebase.firestore();

const addUser = require('./resolvers/addUser.mutation');
const addSubmission = require('./resolvers/addSubmission.mutation');
const addSheet = require('./resolvers/addSheet.mutation');

const getUser = require('./resolvers/getUser.query');
const getCardDeck = require('./resolvers/getCardDeck.query');
const getTeachers = require('./resolvers/getTeachers.query');
const getSections = require('./resolvers/getSections.query');
const {
    getActivitiesBySectionID,
    getActivitiesByTeacherID
} = require('./resolvers/getActivities.query');
const getSubmissions = require('./resolvers/getSubmissions.query');

const submissions = require('./resolvers/submissions.query')(db);
const sectionName = require('./resolvers/sectionName.query')(db);
const teacherName = require('./resolvers/teacherName.query')(db);
const userName = require('./resolvers/userName.query')(db);

const Query = {
    getUser: getUser(db),
    getCardDeck: getCardDeck(db),
    getTeachers: getTeachers(db),
    getSections: getSections(db),
    getActivitiesBySectionID: getActivitiesBySectionID(db),
    getActivitiesByTeacherID: getActivitiesByTeacherID(db),
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
    },
    ActivityInfo: {
        submissions,
        sectionName,
        teacherName,
    },
    Submission: {
        userName
    }
}

module.exports = {
    Query, 
    Mutation,
    ...miscResolvers
};