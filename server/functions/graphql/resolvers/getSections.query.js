const getSections = db => async (_,{teacherID}) => {
    try {
        
        const snapshot = await db.collection('sections')
            .where('teacherID', '==', teacherID)
            .get();
            
        if (snapshot.empty) {
            return 'No Data'
        }
        
        const sections = [];

        snapshot.forEach(doc => {
            const data = doc.data();

            sections.push({
                sectionName: data.sectionName, 
                sectionID: doc.id
            });
        });

        return sections;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getSections;