<script setup lang="ts">
import { ref, computed } from 'vue'
import { Directory, File } from '../types';
import { getSize } from '../utils/get_size';

interface Props {
  node: Directory | File,
  parentHasNoDirectorySize?: boolean
}

const props = defineProps<Props>()

const isOpen = ref(false)
const isDirectory = computed(() => props.node.isDirectory)

const thresholdSize = 100_000;
const directorySize = ref(0);

getSize(props.node, (size: number) => {
  if (size < thresholdSize) {
    directorySize.value += size;
  }
});

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <li>
    <div
      v-if="isDirectory"
      class="directory bold"
      @click="toggle"
    >
      <span>{{ isOpen ? '📂' : '📁' }}</span>
      <span :class="{ red: !directorySize }">{{ props.node.name }} </span>
      <span :class="{ red: !directorySize }" v-if="directorySize && directorySize > 0">({{ directorySize }}kb)</span>
    </div>
    <div class="file"  v-else>
      <span>📄</span>
      <span :class="{ red: props.parentHasNoDirectorySize }">{{ props.node.name }}</span>
      <span v-if="'size' in props.node && props.node.size" :class="{ red: props.parentHasNoDirectorySize }">({{ props.node.size }}kb)</span>
    </div>

    <ul v-show="isOpen" v-if="isDirectory">
      <TreeItem
        v-for="node in (props.node as Directory).children"
        :key="node.name"
        :node="node"
        :parentHasNoDirectorySize="!directorySize"
      />
    </ul>
  </li>
</template>

<style scoped>
.directory {
  cursor: pointer;
  line-height: 1.5;
}

.directory, .file {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>