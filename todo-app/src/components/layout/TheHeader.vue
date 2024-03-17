<template>
  <header>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </header>
</template>

<script>
export default {
  props: ['title', 'subtitle'],
};
</script>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: #8b5cf6;
  display: grid;
  place-items: center;
}

h1,
p {
  color: #fff;
  margin: 0;
  line-height: 1;
  font-size: 1.75rem;
}

p {
  font-size: 0.75rem;
  margin-block-start: -1rem;
}
</style>
