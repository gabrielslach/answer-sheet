const getSections = db => async (_,{teacherID}) => {
    try {
        
        const snapshot = await db.collection('teachers')
            .doc(teacherID)
            .collection('sections')
            .get();
            
        if (snapshot.empty) {
            return 'No Data'
        };

        const sections = [];

        snapshot.forEach(doc => {
            sections.push(doc.id);
        });

        return sections;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getSections;