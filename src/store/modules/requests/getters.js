export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter(req => req.coachId === coachId); // we can only see our request so we use filter here
  },
  hasRequest(_, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};
