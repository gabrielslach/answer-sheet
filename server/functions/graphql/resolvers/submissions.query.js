const submissions = db => async ({activityID}) => {
    try {
        const submissionObj = {
            submissionID: '',
            userID: '',
            userName: '',
            answers: []
        };

        const snap = await db.collection('submissions')
            .where('activityID', '==', activityID)
            .get();

        if (snap.empty) {
            return [];
        }

        const submissions = [];

        snap.forEach(doc => {
            const docData = doc.data();
            const submission = {...submissionObj};
            Object.keys(submission).forEach(key => {
                submission[key] = docData[key] || null;
            })
            submission.submissionID = doc.id;
            

            submissions.push(submission);
        })

        return submissions;
    } catch(err) {
        console.log('submissionsQueryErr', err)
    }
};

module.exports = submissions;