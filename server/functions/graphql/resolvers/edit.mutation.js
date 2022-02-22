const editFx = require('../../firestore/edit.generic');
const getFx = require('../../firestore/get.generic');
const { authHandler, authErrorMsg } = require('./authHandler.util');

const editMutation = (collectionName, userLvlRequirement = ['Student']) => async (_, {docID, documentObj}, {db, authorization}) => {
    try {
        const auth = await authHandler(db, userLvlRequirement, authorization.split(' ')[1]);

        if (!auth.isAllowed) {
            return(authErrorMsg);
        }

        const existingDoc = await getFx(db)(collectionName, docID);
        console.log(`overwriting ${collectionName} (${docID}):`, auth.userInfo, existingDoc, documentObj);
        const { id } = await editFx(db)(collectionName, docID, {...existingDoc, ...documentObj});

        return { id };
        
    } catch (err) {
        return {error: JSON.stringify(err)};
    }
};

module.exports = editMutation;