const sectionName = db => async (parent) => {
    try {
        if (!parent.sectionID) return '';

        const sectionDoc = await db.collection('sections')
            .doc(parent.sectionID)
            .get();

        if (sectionDoc.exists) {
            const docData = sectionDoc.data();

            return docData.sectionName
        }

        return ''
    } catch(err) {
        console.log('sectionNameErr', err)
    }
};

module.exports = sectionName;