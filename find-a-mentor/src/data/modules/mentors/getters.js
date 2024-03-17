export default {
  mentors(state) {
    return state.mentors;
  },

  hasMentors(state) {
    return state.mentors && state.mentors.length > 0;
  },

  isMentor(_, getters, __, rootGetters) {
    const mentors = getters.mentors;
    const userId = rootGetters.userId;

    return mentors.some((mentor) => mentor.id === userId);
  },

  shouldUpdateList(state) {
    const lastFetchTimestamp = state.lastFetch;
    if (!lastFetchTimestamp) return true;
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetchTimestamp) / 1000 >= 60;
  },
};
