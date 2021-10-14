const getActivities = db => async (_,{teacherID, sectionID}) => {
    try {
        
        const snapshot = await db.collection('teachers')
            .doc(teacherID)
            .collection('sections')
            .doc(sectionID)
            .collection('activities')
            .get();
            
        if (snapshot.empty) {
            return 'No Data'
        };

        const activities = [];

        snapshot.forEach(doc => {
            activities.push(doc.id);
        });

        return activities;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getActivities;