<template>
  <TheHeader title="Remember Me" subtitle="Take your vitamin B12." />
  <TheItems />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheItems from './components/TheItems.vue';

export default {
  components: {
    TheHeader,
    TheItems,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
}
</style>
