import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { apolloClient } from "../apollo";
import getSectionsQuery from "../apollo/queries/getSections";
import getTeachersQuery from "../apollo/queries/getTeachers";

const answersModule = {
    state: () => ({
        userInfo:{
            uid: '',
            name: '',
            userType: '',
            section: ''
        },
        teachers: [],
        sections: [],
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
        },
        setTeachers: (state, teachers) => {
            state.teachers = teachers;
        },
        setSections: (state, sections) => {
            state.sections = sections;
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
        },
        fetchTeachers: async ({commit}) => {
            const { data } = await apolloClient.query(getTeachersQuery());
            const { teachers } = data;

            commit("setTeachers", teachers);
        },
        fetchSections: async ({commit}, teacherID) => {
            if (!teacherID || teacherID.length < 1) {
                return commit("setSections", []);
            }
            const { data } = await apolloClient.query(getSectionsQuery(teacherID));
            const { sections } = data;

            commit("setSections", sections);
        },
    },
    getters: {
        getUser: (state) => state.userInfo,
        getAuthToken: state => state.authToken,
        getTeachers: state => state.teachers,
        getSections: state => state.sections
    }
};

export default answersModule;