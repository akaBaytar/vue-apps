<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ['email', 'message'],

  computed: {
    emailLink() {
      return `mailto:${this.email}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.35rem;
}

a {
  color: #8b5cf6;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.25s;
}

a:hover,
a:active {
  color: #ec4899;
}

p {
  margin-block:0.25rem 0;
}
</style>
