<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>