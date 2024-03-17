<template>
  <section>
    <BaseCard>
      <h2>Register as a mentor now!</h2>
      <MentorForm @save-data="saveData" />
    </BaseCard>
  </section>
</template>

<script>
import MentorForm from '../../components/MentorForm.vue';

export default {
  components: {
    MentorForm,
  },

  methods: {
    saveData(data) {
      this.$store.dispatch('mentors/registerMentor', data);
      this.$router.replace('/mentors');
    },
  },
};
</script>
