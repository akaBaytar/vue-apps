<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area" />
      <p>{{ description }}</p>
      <h4>Interested? Reach out now!</h4>
      <BaseButton v-if="buttonIsVisible" link :to="contactLink">Contact</BaseButton>
      <RouterView />
    </BaseCard>
  </section>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      selectedMentor: null,
    };
  },

  computed: {
    fullName() {
      return `${this.selectedMentor.firstName} ${this.selectedMentor.lastName}`;
    },

    contactLink() {
      if (this.$route.path.includes('contact')) {
        return `${this.$route.path}`;
      }
      return `${this.$route.path}/contact`;
    },

    areas() {
      return this.selectedMentor.areas;
    },

    rate() {
      return this.selectedMentor.hourlyRate;
    },

    description() {
      return this.selectedMentor.description;
    },

    buttonIsVisible() {
      return !this.$route.path.includes('contact');
    },
  },

  created() {
    this.selectedMentor = this.$store.getters['mentors/mentors'].find(
      (mentor) => mentor.id === this.id
    );
  },
};
</script>
