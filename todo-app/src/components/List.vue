<template>
  <ul>
    <ListItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :description="item.description"
      :link="item.link"
    />
  </ul>
  <p v-if="items.length === 0">
    You don't have any items in your list. You can add a new item by clicking on
    <span>'New Item'</span>.
  </p>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  inject: ['items'],
  components: { ListItem },
};
</script>

<style scoped>
ul,
p {
  padding: 0;
  margin: auto;
  max-width: 40rem;
}

p {
  font-size: 0.9rem;
  margin-inline: 0.75rem;
}

span {
  color: #8b5cf6;
}

@media (width>= 40em) {
  p {
    margin-inline: auto;
  }
}
</style>
