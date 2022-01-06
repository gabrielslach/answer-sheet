const {decodeToken, authErrorMsg} = require('./authHandler.util');

const getSubmissions = db => async (_, {userType, ID}, { authorization }) => {
    try {
        const { uid } = await decodeToken(authorization.split(' ')[1]);
        if (uid !== ID) {
            return authErrorMsg;
        }

        const qField = {
            teacher: 'sheetInfo.teacherID',
            student: 'userID'
        }

        if (!(typeof qField[userType] === 'string')) {
            return JSON.stringify({type: 'Invalid userType'});
        }
        
        const snapshot = await db.collection('submissions')
            .where(qField[userType], '==', ID)
            .get();

        if (snapshot.empty) {
            return []
        }
        
        const submissions = [];

        snapshot.forEach(doc => {
            submissions.push(JSON.stringify(doc.data()));
        });
        return submissions;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getSubmissions;