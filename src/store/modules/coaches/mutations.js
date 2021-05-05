export default {
  registerCoach(state, payload) {
    state.coaches.push(payload); //here key of formdata and state key is does't same.but not worry, because we change from actions
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
