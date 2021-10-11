const jwt = require('jsonwebtoken');

const login = db => async (_, {name},c, d) => {
    try {
        console.log(_,c, Object.keys(d))
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('name', '==', name).get();

        if (snapshot.empty) {
            return 'No Data'
        };

        const users = []
        await snapshot.forEach( doc => users.push(doc.data()));

        return {...users[0], authToken: 'jwt'};
    } catch (err) {
        return 'User not found.';
    }
};

module.exports = login;