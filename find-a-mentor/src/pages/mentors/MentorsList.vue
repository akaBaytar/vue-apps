<template>
  <BaseDialog :show="!!error" title="An error occured." @close="handleError">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <MentorFilter @change-filter="setFilters" />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="loadMentors(true)">
          Refresh
        </BaseButton>
        <BaseButton v-if="!isLoggedIn" link to="/auth?redirect=register">
          Login to Register as Mentor
        </BaseButton>
        <BaseButton v-if="isButtonActive" link to="/register">
          Register as Mentor
        </BaseButton>
      </div>
      <div v-if="isLoading">
        <BaseSpinner />
      </div>
      <ul v-else-if="hasMentors">
        <MentorItem
          v-for="mentor in filteredMentors"
          :key="mentor.id"
          :id="mentor.id"
          :firstName="mentor.firstName"
          :lastName="mentor.lastName"
          :areas="mentor.areas"
          :rate="mentor.hourlyRate"
        />
      </ul>
      <h5 v-else>No mentors found.</h5>
    </BaseCard>
  </section>
</template>

<script>
import MentorItem from '../../components/MentorItem.vue';
import MentorFilter from '../../components/MentorFilter.vue';

export default {
  created() {
    this.loadMentors();
  },

  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  components: {
    MentorItem,
    MentorFilter,
  },

  computed: {
    filteredMentors() {
      const mentors = this.$store.getters['mentors/mentors'];

      return mentors.filter((mentor) => {
        if (this.activeFilters.frontend && mentor.areas.includes('frontend')) {
          return true;
        }

        if (this.activeFilters.backend && mentor.areas.includes('backend')) {
          return true;
        }

        if (this.activeFilters.career && mentor.areas.includes('career')) {
          return true;
        }

        return false;
      });
    },

    hasMentors() {
      return !this.isLoading && this.$store.getters['mentors/hasMentors'];
    },

    isMentor() {
      return this.$store.getters['mentors/isMentor'];
    },

    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },

    isButtonActive() {
      return this.isLoggedIn && !this.isMentor && !this.isLoading;
    },
  },

  methods: {
    setFilters(uptatedFilters) {
      this.activeFilters = uptatedFilters;
    },

    async loadMentors(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('mentors/loadMentors', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong.';
      }

      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
