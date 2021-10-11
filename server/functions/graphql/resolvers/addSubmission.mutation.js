const addSubmission = db => async (_, {userID, sheetInfo, answers}) => {
    try {
        const {
            teacherID,
            sectionID,
            activityID
        } = sheetInfo;

        const submissionObj = {
            answers,
            userID
        };

        const addSubmissionResp = await db.collection('teachers')
            .doc(teacherID)
            .collection('sections')
            .doc(sectionID)
            .collection('activities')
            .doc(activityID)
            .collection('submissions')
            .add(submissionObj)

        return JSON.stringify(addSubmissionResp);

    } catch (err) {
        return JSON.stringify(err);
    }
};

module.exports = addSubmission;