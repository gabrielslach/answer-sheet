import { createStore } from 'vuex';

import cards from './cards.module';

export default createStore({
    modules: {
        cards
    }
});

