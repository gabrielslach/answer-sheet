import { createStore } from 'vuex';

import cards from './cards.module';
import answers from './answers.module';
import user from './user.module';
import sheets from './sheets.module';
import appState from './appState.module';

export default createStore({
    state: () => ({
        appTitle: 'EZ Answer Sheet'
    }),
    modules: {
        cards,
        answers,
        user,
        sheets,
        appState
    }
});

