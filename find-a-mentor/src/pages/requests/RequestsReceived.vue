<template>
  <BaseDialog :show="!!error" title="An error occured." @close="handleError">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
        <BaseButton mode="outline" @click="loadRequests(true)">
          Refresh
        </BaseButton>
      </header>
      <BaseSpinner v-if="isLoading" />
      <ul v-else-if="hasRequests && !isLoading">
        <RequestItem
          v-for="request in receivedRequests"
          :key="request.id"
          :message="request.message"
          :email="request.userMail"
        />
      </ul>
      <h5 v-else>You have not received any requests yet.</h5>
    </BaseCard>
  </section>
</template>

<script>
import RequestItem from '../../components/RequestItem.vue';

export default {
  created() {
    this.loadRequests();
  },

  components: { RequestItem },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },

    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },

  methods: {
    async loadRequests(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadRequests', {
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
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  height: 2rem;
}

ul {
  list-style-type: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 38rem;
}
</style>
