import actions from './actions';
import getters from './getters.js';
import mutations from './mutations';

export default {
  namespaced: true,

  state() {
    return {
      lastFetch: null,
      requests: [],
    };
  },

  actions,
  getters,
  mutations,
};
