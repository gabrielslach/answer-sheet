const editFx = (db) => (collectionName, docID='', documentObject = {}) => new Promise((resolve, reject) => {
    if (collectionName.length < 1) {
        return reject();
    }

    const docRef = db.collection(collectionName).doc(docID);
    const createResp = docRef.set(documentObject);

    resolve({id: docRef.id, ...createResp});
    
});

module.exports = editFx;