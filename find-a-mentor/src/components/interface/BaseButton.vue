<template>
  <router-link v-if="link" :to="to" :class="mode">
    <slot></slot>
  </router-link>
  <button v-else :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },

    to: {
      type: String,
      required: false,
      default: '/',
    },

    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  font: inherit;
  font-size: 0.75rem;
  background-color: #8b5cf6;
  color: #f5f3ff;
  cursor: pointer;
  border: 1px solid #f5f3ff;
  border-radius: 0.35rem;
  display: inline-block;
  transition: background-color 0.25s;
}

button:nth-child(2n + 1),
a:nth-child(2n + 1) {
  margin-inline-end: 0.5rem;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #6d28d9;
}

.flat {
  background-color: transparent;
  color: #8b5cf6;
}

.outline {
  background-color: transparent;
  color: #6d28d9;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #f5f3ff;
}
</style>
