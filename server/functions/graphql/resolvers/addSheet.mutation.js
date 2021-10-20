const { authHandler, authErrorMsg } = require('./authHandler.util');

const addSheet = (db) => async (_, {sheetInfo, cards}, {authorization}) => {
    try {

        const {isAllowed, userInfo} = await authHandler(db, ['Teacher'], authorization.split(' ')[1]);

        if (!isAllowed) {
            return authErrorMsg;
        }

        console.log('addSheet executed by: ', userInfo);

        const {
            teacherID,
            sectionID,
            activityID
        } = sheetInfo;

        const activityObj = {
            cards
        };

        const teacherRef = db.collection('teachers').doc(teacherID);
        const sectionRef = teacherRef.collection('sections').doc(sectionID);
        const activityRef = sectionRef.collection('activities').doc(activityID);

        await teacherRef.set({});
        await sectionRef.set({});
        const addActivityResp = await activityRef.set(activityObj);

        return JSON.stringify(addActivityResp);
    } catch (err) {
        return JSON.stringify(err);
    }
};

module.exports = addSheet;