const teacherName = db => async (parent) => {
    try {
        if (!parent.teacherID) return '';
        
        const doc = await db.collection('teachers')
            .doc(parent.teacherID)
            .get();

        if (doc.exists) {
            const docData = doc.data();

            return docData.teacherName
        }

        return ''
    } catch(err) {
        console.log('teacherNameErr', err)
    }
};

module.exports = teacherName;