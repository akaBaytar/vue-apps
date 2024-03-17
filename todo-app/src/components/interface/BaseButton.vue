<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode'],
};
</script>

<style scoped>
button {
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  background-color: #8b5cf6;
  border: 1px solid #8b5cf6;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

button:nth-child(2n) {
  margin-inline-start: 1rem;
}

button:hover,
button:active {
  background-color: #8b5cf6;
  border-color: #8b5cf6;
}
.flat {
  background: transparent;
  color: #8b5cf6;
  border: none;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: background-color, color, border-color;
  transition-duration: 0.25s;
}

.flat:hover,
.flat:active {
  color: #fff;
  background-color: #818cf8;
  border-color: #818cf8;
}
</style>
