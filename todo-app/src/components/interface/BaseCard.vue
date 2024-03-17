<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  border-radius: 10px;
  box-shadow: 0 2.5px 5px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin-block: 2rem;
  margin-inline: 0.75rem;
  max-width: 40rem;
}

@media (width>= 40em) {
  div {
    margin-inline: auto;
  }
}
</style>
