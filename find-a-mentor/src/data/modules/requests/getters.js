export default {
  requests(state, _, __, rootGetters) {
    const mentorId = rootGetters.userId;
    return state.requests.filter((request) => request.mentorId === mentorId);
  },

  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },

  shouldUpdateList(state) {
    const lastFetchTimestamp = state.lastFetch;
    if (!lastFetchTimestamp) return true;
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetchTimestamp) / 1000 >= 60;
  },
};
