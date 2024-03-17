<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        autocomplete="first-name"
        v-model.trim="firstName.value"
        @blur="clearValidation('firstName')"
      />
      <p v-if="!firstName.isValid">Firstname field cannot be left blank.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="clearValidation('lastName')"
      />
      <p v-if="!lastName.isValid">Lastname field cannot be left blank.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidation('description')"
      />
      <p v-if="!description.isValid">Description area cannot be left blank.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model.number="rate.value"
        @blur="clearValidation('rate')"
      />
      <p v-if="!rate.isValid">Hourly rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          value="frontend"
          id="frontend"
          v-model="areas.value"
          @blur="clearValidation('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="backend"
          id="backend"
          v-model="areas.value"
          @blur="clearValidation('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="career"
          id="career"
          v-model="areas.value"
          @blur="clearValidation('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">
      You have filled out the form incompletely and/or incorrectly.
    </p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],

  data() {
    return {
      firstName: { value: '', isValid: true },
      lastName: { value: '', isValid: true },
      description: { value: '', isValid: true, lengthIsValid: true },
      rate: { value: null, isValid: true },
      areas: { value: [], isValid: true },
      formIsValid: true,
    };
  },

  methods: {
    validateForm() {
      this.formIsValid = true;

      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.value === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };

      this.$emit('save-data', formData);
    },

    clearValidation(input) {
      this[input].isValid = true;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  user-select: none;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.25rem;
  font: inherit;
  resize: none;
}

input:focus,
textarea:focus {
  background-color: #f5f3ff;
  outline: none;
  border-color: #8b5cf6;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
  accent-color: #8b5cf6;
  cursor: pointer;
}

input[type='checkbox']:focus {
  outline: #8b5cf6 solid 1px;
}

p {
  color: #9f1239;
  font-size: 0.75rem;
  font-weight: bold;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid h3 {
  color: #9f1239;
}

.invalid input,
.invalid textarea {
  border: 1px solid #9f1239;
}
</style>
