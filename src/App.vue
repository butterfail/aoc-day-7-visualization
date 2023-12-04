<script setup lang="ts">
import { ref } from 'vue'
import TreeItem from './components/TreeItem.vue'
import { data } from './data'
import { createTree } from './utils/create_tree';

const formattedData = data.replace(/\r/g, '').trim().split('\n');

const tree = createTree(formattedData);
const node = ref(tree);
</script>

<template>
  <ul>
    <TreeItem :node="node"></TreeItem>
  </ul>
</template>