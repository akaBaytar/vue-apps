<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],

  computed: {
    text() {
      return this.title[0].toUpperCase() + this.title.slice(1);
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ddd6fe;
  color: #171717;
  cursor: default;
  font-size: 0.7rem;
  border-radius: 99999px;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin-right: 0.45rem;
}

.frontend {
  background-color: #6366f1;
  color: #f5f3ff;
}

.backend {
  background-color: #10b981;
  color: #f5f3ff;
}

.career {
  background-color: #ec4899;
  color: #f5f3ff;
}
</style>
