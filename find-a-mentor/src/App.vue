<template>
  <TheHeader />
  <RouterView />
</template>

<script>
import TheHeader from './layout/TheHeader.vue';

export default {
  created() {
    this.$store.dispatch('tryLoginViaLocalStorage');
  },

  components: {
    TheHeader,
  },

  computed: {
    didLogout() {
      return this.$store.getters.didLogout;
    },
  },

  watch: {
    didLogout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue)
        this.$router.replace('/mentors');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
  overflow-y: scroll;
}

body {
  margin: 0;
}

section {
  padding-inline: 1rem;
}
</style>
