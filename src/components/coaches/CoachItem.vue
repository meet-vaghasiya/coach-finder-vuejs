<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>

    <div class="">
      <base-bedge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-bedge>
    </div>
    <div class="actions">
      <!-- <router-link :to="coachContactLink">Contact</router-link>

      <router-link :to="coachDeatailLink">View Details </router-link> -->
      <base-button link mode="outline" :to="coachContactLink">
        Contact
      </base-button>
      <base-button link :to="coachDeatailLink">View Details </base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    coachDeatailLink() {
      return this.$route.path + '/' + this.id;
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
