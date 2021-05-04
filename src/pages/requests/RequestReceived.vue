<template>
  <section>
    <base-card>
      <h2>Requests Received</h2>
      <ul v-if="hasRequest">
        <requests-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></requests-item>
      </ul>
      <h3 v-else>You have't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestsItem from '@/components/requests/RequestsItem';
export default {
  components: {
    RequestsItem
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequest() {
      return this.$store.getters['requests/hasRequest'];
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
