const addSheet = (db) => async (_, {sheetInfo, cards}) => {
    try {
        const {
            teacherID,
            sectionID,
            activityID
        } = sheetInfo;

        const activityObj = {
            cards
        };

        const addActivityResp = await db.collection('teachers')
            .doc(teacherID)
            .collection('sections')
            .doc(sectionID)
            .collection('activities')
            .doc(activityID)
            .set(activityObj);

        return JSON.stringify(addActivityResp);
    } catch (err) {
        return JSON.stringify(err);
    }
};

module.exports = addSheet;