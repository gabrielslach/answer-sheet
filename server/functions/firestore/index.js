const firebase = require('firebase-admin');

const db = firebase.firestore();

const writeData = (collectionID = null, docName = null, data = {}) => new Promise((resolve,reject) => {
    if (collectionID === null) {
        return;
    }
    if (docName === null){
        db.collection(`${collectionID}`)
            .add(data)
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                resolve(docRef.id)
            })
            .catch(error => {
                console.error("Error adding document: ", error);
                reject();
            });
    } else {
        try {
            db.collection(`${collectionID}`)
            .doc(`${docName}`)
            .set(data)
            .then(docRef => {
                resolve(docRef.id)
            });
        } catch(e) {
            console.log(e);
            reject();
        };
    }
});

const updateField = (collectionID = null, docName = null, data = {}) => new Promise((resolve,reject) => {
    try {
        db.collection(`${collectionID}`)
        .doc(`${docName}`)
        .update(data)
        .then(docRef => {
            resolve(docRef.id)
        });
    } catch(e) {
        console.log(e);
        reject();
    };
});

const deleteDocument = (collectionID = null, docName = null) => new Promise((resolve,reject) => {
    try {
        db.collection(`${collectionID}`)
        .doc(`${docName}`)
        .delete()
        .then(docRef => {
            resolve()
        });
    } catch(e) {
        console.log(e);
        reject();
    };
});

const getCollection = (collectionKey)=> new Promise((resolve, reject) => {
    db.collection(collectionKey)
        .get()
        .then(querySnapshot => {
            const docs = querySnapshot.docs.map(doc => {
                //console.log(`${doc.id} => ${doc.data()}`)
                return doc.data();
            });
            resolve(docs);
        })
        .catch(e=>reject(e));
});

const getCollections = (db) => new Promise((resolve, reject) => {
    db.listCollections()
    .then(collections => {
        const collectionIds = collections.map(item => item.id);
        resolve(collectionIds);
    })
    .catch(err=> {
        console.log('getCollections err:', err);
        reject();
    });
});

const getDoc = (collectionKey, docKey)=> new Promise((resolve, reject) => {
    db.collection(`${collectionKey}`)
        .doc(`${docKey}`)
        .get()
        .then(querySnapshot => {
            resolve(querySnapshot.data());
            })
        .catch(e=>reject(e))
});

const getIds = (collectionKey)=> new Promise((resolve, reject) => {
    db.collection(`${collectionKey}`)
        .get()
        .then(querySnapshot => {
            const playerIds = [];
            const cardIds = [];
            querySnapshot.docs.forEach(doc => {
                const docData = doc.data();

                if (docData.player) {
                    const {id, cards} = docData.player;
                    playerIds.push(id);
                    cards.forEach(card => {
                        cardIds.push(card.id);
                    });
                }
            })
            resolve({playerIds, cardIds});
            })
        .catch(e=>reject(e))
});


module.exports = {
    writeData,
    updateField,
    deleteDocument,
    getCollection,
    getDoc,
    getIds,
    getCollections
}