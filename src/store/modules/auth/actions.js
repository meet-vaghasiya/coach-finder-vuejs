export default {
  async login(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
    //identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
    // const response = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAstyiu6JW3XzUpgpAaImoUlL6kOuyGAPg',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email: payload.email,
    //       password: payload.password,
    //       returnSecureToken: true
    //     })
    //   }
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   console.log(responseData);
    //   const error = new Error(responseData.message || 'Failed to auth');
    //   throw error;
    // }
    // context.commit('setUser', {
    //   token: responseData.idToken,
    //   userId: responseData.localId,
    //   tokenExpirition: responseData.expiresIn
    // });
  },

  async signup(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
    // const response = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAstyiu6JW3XzUpgpAaImoUlL6kOuyGAPg',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email: payload.email,
    //       password: payload.password,
    //       returnSecureToken: true
    //     })
    //   }
    // );
    // const responseData = await response.json();
    // if (!response.ok) {
    //   console.log(responseData);
    //   const error = new Error(responseData.message || 'Failed to auth');
    //   throw error;
    // }
    // console.log(responseData);
    // context.commit('setUser', {
    //   token: responseData.idToken,
    //   userId: responseData.localId,
    //   tokenExpirition: responseData.expiresIn
    // });
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpirition: null
    }); // we already set User in mutaion we need to change value to null instead of userId, token original value
  },
  async auth(context, payload) {
    //identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAstyiu6JW3XzUpgpAaImoUlL6kOuyGAPg';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAstyiu6JW3XzUpgpAaImoUlL6kOuyGAPg';
    }

    const response = await fetch(
      url,

      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to auth');
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpirition: responseData.expiresIn
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpirition: null
      });
    }
  }
};
