<template>
  <div>
    <h1>Item List</h1>
    <ChildItem :items="items">
      <template #item="{ item }">
        <strong>{{ item.name }}</strong>
      </template>
    </ChildItem>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ChildItem from './ChildItem.vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])
</script>
