const getActivities = db => async (_, {sectionID}) => {
    try {
        const activityInfo = {
            activityID: '',
            activityName: '',
            sectionID: '',
            sectionName: '',
            teacherID: '',
            teacherName: '',
            submissions: [],
            deadlineDate: ''
        };
        
        const activitySnap = await db.collection('activities')
            .where('sectionID', '==', sectionID)
            .get();

        if (activitySnap.empty) {
            return [];
        }
        
        const activities = [];

        activitySnap.forEach(doc => {
            const docData = doc.data();
            const actInfo = {...activityInfo};
            Object.keys(actInfo).forEach(key => {
                actInfo[key] = docData[key] || null;
            })
            actInfo.activityID = doc.id;
            actInfo.deadlineDate = String(actInfo.deadlineDate.toMillis());
            
            activities.push(actInfo);
        })

        return activities;
    } catch(err) {
        console.log('getActivitiesErr', err)
    }
};

module.exports = getActivities;