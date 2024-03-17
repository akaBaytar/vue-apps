export default {
  async registerMentor(context, payload) {
    const mentorData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };

    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;

    const res = await fetch(
      `${process.env.VUE_APP_API}/mentors/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(mentorData),
      }
    );

    if (!res.ok) {
      console.log('error handling later');
    }

    context.commit('registerMentor', {
      ...mentorData,
      id: userId,
    });
  },

  async loadMentors(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdateList) return;

    const res = await fetch(`${process.env.VUE_APP_API}/mentors.json`);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Failed to fetch mentors data.');
      throw error;
    }

    const mentors = [];

    for (const id in data) {
      const mentor = {
        id: id,
        firstName: data[id].firstName,
        lastName: data[id].lastName,
        description: data[id].description,
        hourlyRate: data[id].hourlyRate,
        areas: data[id].areas,
      };
      mentors.push(mentor);
    }

    context.commit('setMentors', mentors);
    context.commit('setFetchTimestamp');
  },
};
