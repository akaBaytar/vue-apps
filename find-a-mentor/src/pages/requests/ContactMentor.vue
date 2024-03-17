<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autocomplete="email"
        v-model.trim="email"
      />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea name="message" id="message" rows="5" v-model.trim="message" />
    </div>
    <div class="actions">
      <p class="error" v-if="!formIsValid">
        Please enter a valid email and/or message.
      </p>
      <BaseButton>Send Message</BaseButton>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },

  methods: {
    submitForm() {
      this.formIsValid = true;

      if (
        this.email === '' ||
        this.message === '' ||
        !this.email.includes('@')
      ) {
        this.formIsValid = false;
        return;
      }

      this.$store.dispatch('requests/contactMentor', {
        email: this.email,
        message: this.message,
        mentorId: this.$route.params.id,
      });

      this.$router.replace('/mentors')
    },
  },
};
</script>

<style scoped>
form {
  margin-block: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
}

.form-control {
  margin-block: 0.5rem;
}

label {
  font-weight: bold;
  margin-block-end: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.25rem;
  resize: none;
}

input:focus,
textarea:focus {
  background-color: #f5f3ff;
  outline: none;
}

.error {
  font-size: 0.75rem;
  color: #9f1239;
}

.actions {
  margin-block-start: 1rem;
}
</style>
