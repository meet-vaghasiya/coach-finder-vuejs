<template>
  <div>
    <base-card>
      <h1>Register as a coach now!</h1>
      <coatch-form @save-data="saveData"></coatch-form>
    </base-card>
  </div>
</template>

<script>
import CoatchForm from '@/components/coaches/CoatchForm';
export default {
  components: {
    CoatchForm
  },

  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      // this.$router.push('/coaches');
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped></style>
