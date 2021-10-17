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
            console.log(Object.keys(doc))
            sections.push(doc.data());
        });

        return sections;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getSections;