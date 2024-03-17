<template>
  <BaseCard>
    <BaseButton @click="setSelectedTab('list')" :mode="itemMode">
      Stored Items
    </BaseButton>
    <BaseButton @click="setSelectedTab('add-item')" :mode="addItemMode">
      New Item
    </BaseButton>
  </BaseCard>
  <component :is="selectedTab" />
</template>

<script>
import List from './List.vue';
import AddItem from './AddItem.vue';

import BaseButton from './interface/BaseButton.vue';
import BaseCard from './interface/BaseCard.vue';

export default {
  components: { List, AddItem, BaseCard, BaseButton },

  data() {
    return {
      selectedTab: 'list',
      items: [],
    };
  },

  provide() {
    return {
      items: this.items,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
    };
  },

  computed: {
    itemMode() {
      return this.selectedTab === 'list' ? null : 'flat';
    },

    addItemMode() {
      return this.selectedTab === 'add-item' ? null : 'flat';
    },
  },

  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },

    addItem(title, description, link) {
      const newItem = {
        id: Math.random() * 100000,
        title,
        description,
        link,
      };

      this.items.unshift(newItem);
      this.selectedTab = 'list';
    },

    deleteItem(id) {
      const idx = this.items.findIndex((item) => item.id === id);
      this.items.splice(idx, 1);
    },
  },
};
</script>
