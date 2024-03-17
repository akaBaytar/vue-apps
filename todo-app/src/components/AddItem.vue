<template>
  <BaseCard>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" ref="titleInput" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          ref="descInput"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="link">Link</label>
        <input type="url" id="link" name="link" ref="linkInput" />
      </div>
      <div>
        <BaseButton type="submit">Add New Item</BaseButton>
      </div>
    </form>
  </BaseCard>
  <BaseDialog v-if="isInvalid" title="Invalid Input" @close="confirmDialog">
    <template #main>
      <p>Sorry, at least one input is invalid.</p>
      <p>Review your inputs and ensure each input is filled.</p>
    </template>
    <template #actions>
      <BaseButton @click="confirmDialog">Confirm</BaseButton>
    </template>
  </BaseDialog>
</template>

<script>
import BaseCard from './interface/BaseCard.vue';
import BaseButton from './interface/BaseButton.vue';
import BaseDialog from './interface/BaseDialog.vue';

export default {
  components: { BaseCard, BaseButton, BaseDialog },

  inject: ['addItem'],

  data() {
    return {
      isInvalid: false,
    };
  },

  methods: {
    submitData() {
      let title = this.$refs.titleInput.value;
      let description = this.$refs.descInput.value;
      let link = this.$refs.linkInput.value;

      if (
        title.trim() === '' ||
        description.trim() === '' ||
        link.trim() === ''
      ) {
        this.isInvalid = true;
        return;
      }

      this.addItem(title, description, link);
    },

    confirmDialog() {
      this.isInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  font-weight: bold;
  margin-block-end: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  resize: none;
  font-family: inherit;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: 0.25s border-color;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #8b5cf6;
}

.form-control {
  margin: 1rem 0;
}
</style>
