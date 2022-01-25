const insertFx = require('../../firestore/insert.generic');
const { authHandler, authErrorMsg } = require('./authHandler.util');

const insertMutation = (collectionName, userLvlRequirement = ['Student']) => async (_, documentObj, {db, authorization}) => {
    try {
        const auth = await authHandler(db, userLvlRequirement, authorization.split(' ')[1]);

        if (!auth.isAllowed) {
            return(authErrorMsg);
        }

        console.log(`adding to ${collectionName}:`, auth.userInfo, documentObj);
        const { id } = await insertFx(db)(collectionName, documentObj);

        return { id };
        
    } catch (err) {
        return {error: JSON.stringify(err)};
    }
};

module.exports = insertMutation;