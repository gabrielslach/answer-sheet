const getCardDeck = db => async (_, {activityID}) => {
    try {        
        const snapshot = await db.collection('activities')
            .doc(activityID)
            .get();
            
        if (snapshot.empty) {
            return [];
        }

        const activityObj = snapshot.data();
        const cards = activityObj.cards || [];

        return cards;
    } catch(err) {
        return [];
    }
};

module.exports = getCardDeck;