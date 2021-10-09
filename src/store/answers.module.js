const answersModule = {
    state: () => ({
        student:{
            id: '',
            name: '',
            section: ''
        },
        answers:{}
    }),
    mutations: {
        upsertStudent: (state, info) => {
            for (let key in Object.keys(state)) {
                if (info[key]) {
                    state.student[key] = info[key];
                    }
            }
        },
        upsertAnswer: (state, {questionID, answer}) => {
            state.answers[questionID] = answer;
        }
    },
    actions: {
        upsertStudent: ({commit}, {key, val}) => {
            console.log('upsertStudent', {}[key] = val);
            commit('upsertStudent', {}[key] = val);
        },
        upsertAnswer: ({commit}, {questionID, answer}) => {
            console.log('upsertAnswer', {questionID, answer});
            commit('upsertAnswer', {questionID, answer});
        }
    },
    getters: {

    }
};

export default answersModule;