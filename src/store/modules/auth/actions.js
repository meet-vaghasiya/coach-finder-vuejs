export default {
  async login(context, payload) {
    //identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAstyiu6JW3XzUpgpAaImoUlL6kOuyGAPg',

      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
          // returnSecureToken: true
        })
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || 'Failed to auth');
      throw error;
    }
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpirition: responseData.expiresIn
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAstyiu6JW3XzUpgpAaImoUlL6kOuyGAPg',
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
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpirition: responseData.expiresIn
    });
  }
};
