<template>
  <section>
    <BaseDialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseDialog fixed :show="isLoading" title="Authenticating...">
      <BaseSpinner />
    </BaseDialog>
    <BaseCard>
      <h2>{{ submitButtonCaption }}</h2>
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
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autocomplete="new-password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid" class="error">
          Please enter a valid email address and password.
          <br />
          Password must be at least 6 characters.
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">
          {{ switchButtonCaption }}
        </BaseButton>
      </form>
    </BaseCard>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      mode: 'login',
      isLoading: false,
      formIsValid: true,
    };
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },

    switchButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        this.mode === 'login'
          ? await this.$store.dispatch('login', payload)
          : await this.$store.dispatch('signup', payload);

        const redirect = `/${this.$route.query.redirect || 'mentors'}`;

        this.$router.replace(redirect);
      } catch (error) {
        this.error =
          'An error occurred during authentication. Please try entering a valid email and/or password.';
      }

      this.isLoading = false;
    },

    switchAuthMode() {
      this.mode === 'login' ? (this.mode = 'signup') : (this.mode = 'login');
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin-block: 1rem;
}

.form-control {
  margin-block: 0.5rem;
}

label {
  font-weight: bold;
  margin-block-end: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.25rem;
  resize: none;
}

input:focus {
  background-color: #f5f3ff;
  outline: none;
}

p {
  font-size: 0.9rem;
}

p.error {
  font-size: 0.75rem;
  color: #9f1239;
}

button {
  margin-inline-end: 0.5rem;
}
</style>
