<template>
  <li>
    <BaseCard>
      <header>
        <h3>{{ title }}</h3>
        <BaseButton mode="flat" @click="deleteItem(id)">Delete</BaseButton>
      </header>
      <p>{{ description }}</p>
      <nav>
        <a :href="link" target="_blank" rel="noreferrer">View Details</a>
      </nav>
    </BaseCard>
  </li>
</template>

<script>
import BaseButton from './interface/BaseButton.vue';
import BaseCard from './interface/BaseCard.vue';

export default {
  props: ['id', 'title', 'description', 'link'],
  inject: ['deleteItem'],
  components: { BaseCard, BaseButton },
};
</script>

<style scoped>
li {
  margin: auto;
  max-width: 40rem;
  list-style-type: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #8b5cf6;
  transition: 0.25s color;
}

a:hover,
a:active {
  color: #818cf8;
}
</style>
