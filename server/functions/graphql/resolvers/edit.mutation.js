const editFx = require('../../firestore/edit.generic');
const { authHandler, authErrorMsg } = require('./authHandler.util');

const insertMutation = (collectionName, userLvlRequirement = ['Student']) => async (_, {docID, documentObj}, {db, authorization}) => {
    try {
        const auth = await authHandler(db, userLvlRequirement, authorization.split(' ')[1]);

        if (!auth.isAllowed) {
            return(authErrorMsg);
        }

        console.log(`overwriting ${collectionName} (${docID}):`, auth.userInfo, documentObj);
        const { id } = await editFx(db)(collectionName, docID, documentObj);

        return { id };
        
    } catch (err) {
        return {error: JSON.stringify(err)};
    }
};

module.exports = insertMutation;