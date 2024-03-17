import { createStore } from 'vuex';

import authModule from './modules/auth';
import mentorsModule from './modules/mentors';
import requestsModule from './modules/requests';

const store = createStore({
  modules: {
    auth: authModule,
    mentors: mentorsModule,
    requests: requestsModule,
  },
});

export default store;
