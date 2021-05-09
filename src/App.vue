<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <!-- if we are wrapping route component with transitinon than children componnt should wrap in one element like div or section (only in pages) -->
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
export default {
  components: {
    TheHeader
  },
  created () {
    this.$store.dispatch('tryLogin');
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout 
    }
  },
  watch: {
    didAutoLogout(curVal,oldVal){
        if(curVal && curVal!== oldVal){
          this.$router.replace('/coaches')
        }
    }
  } 
};
</script>

<style>
/* dont give scope here because we are set for all file  */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transform: all 0.3s ease-out;
}
.route-leave-active {
  transform: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
