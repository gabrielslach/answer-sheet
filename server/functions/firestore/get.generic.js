const getFx = (db) => async (collectionName, docID) =>{
    const doc = await db.collection(collectionName)
            .doc(docID)
            .get();

        if (doc.exists) {
            const docData = doc.data();

            return docData
        }
}

module.exports = getFx;