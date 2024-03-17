<template>
  <teleport to="body">
    <div @click="$emit('close')" />
    <dialog open>
      <header>
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
      </header>
      <section>
        <slot name="main"></slot>
      </section>
      <menu>
        <slot name="actions">
          <BaseButton @click="$emit('close')">Close</BaseButton>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },

  emits: ['close'],

  components: { BaseButton },
};
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2.5px 5px rgba(0, 0, 0, 0.25);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: #8b5cf6;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h3 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (width >= 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
