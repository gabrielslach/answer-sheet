const insertFx = require('../../firestore/insert.generic');
const { authHandler, authErrorMsg } = require('./authHandler.util');

const addSheet = (db) => async (_, {sheetInfo}, {authorization}) => {
    try {
        const {isAllowed, userInfo} = await authHandler(db, ['Teacher'], authorization.split(' ')[1]);

        if (!isAllowed) {
            return authErrorMsg;
        }

        console.log('addSheet executed by: ', userInfo);

        const insertResp = await insertFx(db)('teachers', {
            ...sheetInfo,
            cards: []
            });

        return JSON.stringify(insertResp);
        
    } catch (err) {
        return JSON.stringify(err);
    }
};

module.exports = addSheet;