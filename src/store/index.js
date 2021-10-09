import { createStore } from 'vuex';

import cards from './cards.module';
import answers from './answers.module';

export default createStore({
    state: () => ({
        hi: 'drix'
    }),
    modules: {
        cards,
        answers
    }
});

