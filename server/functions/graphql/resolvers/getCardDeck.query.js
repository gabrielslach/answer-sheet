const getCardDeck = db => async (_, {sheetInfo}) => {
    try {
        const {
            teacherID,
            sectionID,
            activityID
        } = sheetInfo;
        
        const snapshot = await db.collection('teachers')
            .doc(teacherID)
            .collection('sections')
            .doc(sectionID)
            .collection('activities')
            .doc(activityID)
            .get();
            
        if (snapshot.empty) {
            return 'No Data'
        };

        const activityObj = snapshot.data();
        const cards = activityObj.cards;

        return cards;
    } catch(err) {
        return 'No Data Found';
    }
};

module.exports = getCardDeck;