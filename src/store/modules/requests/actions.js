export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
      coachId: payload.coachId
    };
    const resposnse = await fetch(
      `https://stalwart-veld-303412-default-rtdb.firebaseio.com/requests/${payload.coachId}}.json`,
      {
        method: 'POST', // put request overwritten data if there already existed in database
        body: JSON.stringify(newRequest)
      }
    );
    if (!resposnse.ok) {
      const error = new Error(
        responseData.message || 'Failed to send requests.'
      );
      throw error;
    }
    const responseData = await resposnse.json();

    newRequest.id = responseData.name; // its firebase unique id name
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const resposnse = await fetch(
      `https://stalwart-veld-303412-default-rtdb.firebaseio.com/requests/${coachId}}.json`
    );

    if (!resposnse.ok) {
      const error = new Error(resposnse.message || 'Failed to send request');
      throw error;
    }
    const responseData = await resposnse.json();
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit('setRequets', requests);
  }
};
