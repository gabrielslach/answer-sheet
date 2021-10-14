import { apolloClient } from "../apollo";
import addSheetQuery from "../apollo/mutations/addSheet";
import getCardDeckQuery from "../apollo/queries/getCardDeck";

const cardModule = {
    state: () => ({
        cards:[]
    }),
    mutations: {
        addCards: (state, newCards) => {
            state.cards = [
                ...state.cards,
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
        fetchCards: async ({commit}, {teacherID, sectionID, activityID}) => {
            const { data } = await apolloClient.query(getCardDeckQuery(teacherID, sectionID, activityID));
            const { cardDeck } = data;

            commit("loadCards", cardDeck);
        },
        uploadCards: async ({state}, {teacherID, sectionID, activityID}) => {
            const response = await apolloClient.mutate(addSheetQuery(teacherID, sectionID, activityID, state.cards));

            console.log('l 54', response)
        }
    },
    getters: {
        cardDeck: (state) => state.cards,
    }
};

export default cardModule;