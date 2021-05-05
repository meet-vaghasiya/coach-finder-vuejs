export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequets(state, payload) {
    state.requests = payload;
  }
};
