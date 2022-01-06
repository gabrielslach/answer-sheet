const queryConstructor = (queryRef) => (key, val) => {
    const fields = {
        userID: 'userID',
        teacherID: 'sheetInfo.teacherID',
        sectionID: 'sheetInfo.sectionID',
        activityID: 'sheetInfo.activityID'
    }

    return queryRef.where(fields[key], '==', val);
}

const fetchSubmissions = db => (parameters) => {
    let queryRef = db.collection('submissions')
    
    Object.entries(parameters).forEach(([key, val]) => {
        queryRef = queryConstructor(queryRef)(key, val)
    })

    return queryRef.get();
}

const getActivities = db => async (_,{teacherID, sectionID, userID}) => {
    try {        
        const activitiesSnap = await db.collection('teachers')
            .doc(teacherID)
            .collection('sections')
            .doc(sectionID)
            .collection('activities')
            .get();
            
        if (activitiesSnap.empty) {
            return 'No Data'
        }

        const activities = [];

        activitiesSnap.forEach(async (doc) => {            
            const submissionsSnap = await fetchSubmissions(db)({teacherID, sectionID, activityID: doc.id, userID});

            activities.push(JSON.stringify({
                activityID: doc.id,
                noSubmissions: submissionsSnap.size
            }));
        });

        return activities;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getActivities;