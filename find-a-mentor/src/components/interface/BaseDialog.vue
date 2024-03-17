<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <header>
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu v-if="!fixed">
        <slot name="actions">
          <base-button @click="tryClose">Close</base-button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  margin-inline: auto;
  top: 7rem;
  width: 95%;
  max-width: 40rem;
  padding: 0;
  z-index: 100;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  background-color: #fff;
}

header {
  background-color: #8b5cf6;
  color: #fff;
  width: 100%;
  padding: 1rem;
}

header h3 {
  margin: 0;
}

section {
  padding: 0.5rem 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
</style>
