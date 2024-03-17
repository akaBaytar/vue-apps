let timer;

export default {
  async auth(context, payload) {
    const mode = payload.mode;

    let url =
      mode === 'login'
        ? `${process.env.VUE_APP_SIGNIN}`
        : `${process.env.VUE_APP_SIGNUP}`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to authenticate.');
      throw error;
    }

    const expiresIn = +data.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(
      () => context.dispatch('logoutViaTokenExpiration'),
      expiresIn
    );

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
    });
  },

  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  tryLoginViaLocalStorage(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn <= 0) return;

    timer = setTimeout(
      () => context.dispatch('logoutViaTokenExpiration'),
      expiresIn
    );

    if (token && userId) {
      context.commit('setUser', { token, userId });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      userId: null,
      token: null,
    });
  },

  logoutViaTokenExpiration(context) {
    context.dispatch('logout');
    context.commit('didLogout');
  },
};
