const cardModule = {
    state: () => ({
        cards:{}
    }),
    mutations: {
        addCards (state, newCards) {
            console.log('adding', newCards);
            state.cards = [
                ...state.cards,
                ...newCards
            ];
        },
    },
    actions: {
        addCardsFromSheet: ({commit}) => sheetJSON => {
            console.log('hillo',sheetJSON)
            const sheetData = sheetJSON.map(row => {
                if (row.CardType !== 'multiple-choice') {
                    return row
                    }

                row.choices = [];
                Object.keys(row).forEach(key => {
                    const isChoice = /(Choice|choice)\d$/.test(key);

                    if (isChoice) {
                        row.choices.push(row[key])

                        delete row[key];
                    }
                });

                return row;
            });

            commit("addCards", sheetData);
        }
    },
    getters: {
        getCards: (state) => state.cards,
    }
};

export default cardModule;