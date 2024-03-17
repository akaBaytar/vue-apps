export default {
  async contactMentor(context, payload) {
    const newRequest = {
      userMail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `${process.env.VUE_APP_API}/requests/${payload.mentorId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to send request.');
      throw error;
    }

    newRequest.id = data.name;
    newRequest.mentorId = payload.mentorId;

    context.commit('addRequest', newRequest);
  },

  async loadRequests(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdateList) return;

    const token = context.rootGetters.token;
    const mentorId = context.rootGetters.userId;

    const response = await fetch(
      `${process.env.VUE_APP_API}/requests/${mentorId}.json?auth=${token}`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to send request.');
      throw error;
    }

    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        mentorId: mentorId,
        userMail: data[key].userMail,
        message: data[key].message,
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
    context.commit('setFetchTimestamp');
  },
};
