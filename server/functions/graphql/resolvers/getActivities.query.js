const getActivities =  snapshot => {
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
        
        const activities = [];

        snapshot.forEach(doc => {
            const docData = doc.data();
            const actInfo = {...activityInfo};
            Object.keys(actInfo).forEach(key => {
                if (!docData.sheetInfo) return;

                actInfo[key] = docData.sheetInfo[key] || null;
            })
            actInfo.activityID = doc.id;
            
            activities.push(actInfo);
        })

        return activities;
    } catch(err) {
        console.log('getActivitiesErr', err)
    }
};

const getActivitiesBySectionID = db => async (_, {sectionID}) => {
    try {    
        const activitySnap = await db.collection('activities')
            .where('sectionID', '==', sectionID)
            .get();

        if (activitySnap.empty) {
            return [];
        }

        return getActivities(activitySnap);
    } catch(err) {
        console.log('getActivitiesErr', err)
    }
};

const getActivitiesByTeacherID = db => async (_, {teacherID}) => {
    try {    
        const activitySnap = await db.collection('activities')
            .where('sheetInfo.teacherID', '==', teacherID)
            .get();

        if (activitySnap.empty) {
            return [];
        }

        return getActivities(activitySnap);
    } catch(err) {
        console.log('getActivitiesErr', err)
    }
};
module.exports = {
    getActivitiesBySectionID,
    getActivitiesByTeacherID
};