import { apolloClient } from "../apollo";
import addSubmissionQuery from "../apollo/mutations/addSubmission";

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
        },
        submitAnswers: ({state, rootState}, {teacherID, sectionID, activityID}) => {
            const userID = rootState.user.userInfo.uid;
            const parsedAnswers = Object.entries(state.answers).map(([questionID, answer]) => ({
                questionID,
                answer
            }));
            apolloClient.mutate(addSubmissionQuery(
                userID, 
                teacherID,
                sectionID,
                activityID,
                parsedAnswers
                ));
        }
    },
    getters: {

    }
};

export default answersModule;