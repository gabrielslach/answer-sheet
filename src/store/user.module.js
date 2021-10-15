import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

const answersModule = {
    state: () => ({
        userInfo:{
            uid: '',
            name: '',
            userType: '',
            section: ''
        },
        authToken: localStorage.getItem('authToken') || ''
    }),
    mutations: {
        setUserInfo: (state, userInfo) => {
            console.log(userInfo)
            for (let key of Object.keys(state.userInfo)) {
                if (userInfo[key]) {
                    state.userInfo[key] = userInfo[key];
                    }
            }
        },
        setAuthToken: (state, authToken) => {
            state.authToken = authToken;
        }
    },
    actions: {
        addUserToAuth: async ({commit, dispatch}, {email, password, name, teacher, section}) => {
            try {
                const auth = getAuth();
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                commit('setUserInfo', {uid: userCredentials.user.uid})
                dispatch('addUserToDB', {uid: userCredentials.user.uid, name, teacher, section})
            } catch (error) {
                alert(JSON.stringify(error));
            }
        },
        addUserToDB: async (_, {uid, name, teacher, section}) => {
            console.log(uid, name, teacher, section);
        },
        login: async ({commit}, {email, password}) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((data) => {
                    console.log(data);
                }).catch( err => {
                    console.log('Auth error', err);
                })

            const userInfo = {};
                
            commit('setUserInfo', userInfo);
        },
        logout: async () => {
            const auth = getAuth();
            try {
                await signOut(auth);
                localStorage.removeItem('authToken');
            } catch (error) {
                console.log('Signout error.')
            }
        },
        setAuthToken: async ({commit}, authToken) => {
            commit('setAuthToken', authToken);
            localStorage.setItem('authToken', authToken);
        }
    },
    getters: {
        getUser: (state) => state.userInfo,
        getAuthToken: state => state.authToken
    }
};

export default answersModule;