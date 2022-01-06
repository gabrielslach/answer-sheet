const {decodeToken, authErrorMsg} = require('./authHandler.util');

const addSubmission = db => async (_, {userID, sheetInfo, answers}, { authorization }) => {
    try {
        const { uid } = await decodeToken(authorization.split(' ')[1]);
        
        if (uid !== userID) {
            return authErrorMsg;
        }

        const checkedAnswers = await checkAnswers(db, sheetInfo, answers);
        
        const submissionObj = {
            answers: checkedAnswers,
            userID,
            sheetInfo
        };

        const addSubmissionResp = await db.collection('submissions')
            .add(submissionObj)

        return JSON.stringify(addSubmissionResp);

    } catch (err) {
        return JSON.stringify({type: 'Server error', err});
    }
};

const checkAnswers = async (db, sheetInfo, answers) => {
    const {
        teacherID,
        sectionID,
        activityID
    } = sheetInfo;
    
    const snapshot = await db.collection('teachers')
        .doc(teacherID)
        .collection('sections')
        .doc(sectionID)
        .collection('activities')
        .doc(activityID)
        .get();
        
    if (snapshot.empty) {
        return 'No Data'
    }

    const activityObj = snapshot.data();
    const cards = activityObj.cards;
    const cardsObj = {};
    
    //answers => [{questionID, answer}]

    cards.forEach(card => {
        const {id, CorrectAnswer} = card;
        cardsObj[id] = CorrectAnswer;
    });
    
    const checkedAnswers = answers.map(item => {
        const {questionID, answer} = item;

        if (cardsObj[questionID] !== undefined) {
            const isCorrect = cardsObj[questionID] === answer;
            return {...item, isCorrect};
        } else {
            return item;
        }
    });
    
    return Promise.resolve(checkedAnswers);
}

module.exports = addSubmission;