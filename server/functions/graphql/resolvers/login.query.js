const jwt = require('jsonwebtoken');

const login = db => async (_, {name}) => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('name', '==', name).get();

    if (snapshot.empty) {
        return 'No Data'
    };

    const users = []
    await snapshot.forEach( doc => users.push(doc.data()));

    return {...users[0], authToken: 'jwt'};
};

module.exports = login;