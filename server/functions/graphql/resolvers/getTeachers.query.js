const getTeachers = db => async () => {
    try {
        
        const snapshot = await db.collection('teachers').get();
            
        if (snapshot.empty) {
            return 'No Data'
        };
        
        const teachers = [];

        snapshot.forEach(doc => {
            teachers.push(doc.id);
        });

        return teachers;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getTeachers;