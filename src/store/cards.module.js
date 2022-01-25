import { apolloClient } from "../apollo";
import createActivityQuery from "../apollo/mutations/createActivity";
import getCardDeckQuery from "../apollo/queries/getCardDeck";

const cardModule = {
    state: () => ({
        cards:[]
    }),
    mutations: {
        addCards: (state, newCards) => {
            state.cards = [
                ...newCards
            ];
        },
        loadCards: (state, cardDeck) => {
            state.cards = cardDeck;
        },
    },
    actions: {
        addCardsFromSheet: ({commit}, sheetJSON) => {
            const sheetData = sheetJSON.map((row, index) => {
                row.id = index;

                if (row.CardType !== 'multiple-choice') {
                    return row
                    }

                row.Choices = [];
                Object.keys(row).forEach(key => {
                    const isChoice = /(Choice|choice)\d$/.test(key);

                    if (isChoice) {
                        row.Choices.push(row[key])

                        delete row[key];
                    }
                });

                return row;
            });

            commit("addCards", sheetData);
        },
        fetchCards: async ({commit}, activityID) => {
            debugger; // eslint-disable-line no-debugger
            commit('setLoading', true);
            const { data } = await apolloClient.query(getCardDeckQuery(activityID));
            const { cardDeck } = data;

            commit("loadCards", cardDeck);
            commit('setLoading', false);
        },
        createActivity: async ({commit}, {teacherID, sectionName, activityName}) => {
            commit('setLoading', true);
            await apolloClient.mutate(createActivityQuery(teacherID, sectionName, activityName));

            commit('setLoading', false);
        }
    },
    getters: {
        cardDeck: (state) => state.cards,
    }
};

export default cardModule;