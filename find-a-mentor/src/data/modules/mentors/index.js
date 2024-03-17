import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {
  namespaced: true,

  state() {
    return {
      lastFetch: null,
      
      mentors: [
        {
          id: '',
          firstName: '',
          lastName: '',
          areas: [],
          description: '',
          hourlyRate: 0,
        },
      ],
    };
  },

  actions,
  getters,
  mutations,
};
