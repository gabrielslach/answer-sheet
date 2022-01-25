const userName = db => async ({userID}) => {
    try {
        if (!userID) return '';

        const doc = await db.collection('users')
            .doc(userID)
            .get();

        if (doc.exists) {
            const docData = doc.data();

            return docData.name
        }

        return '';
    } catch(err) {
        console.log('userNameErr', err)
    }
};

module.exports = userName;