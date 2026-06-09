<script lang="ts" setup>
const props = defineProps<{
  scrollCount?: number; // 滚动个数
}>();
</script>

<template>
  <div class="scroll-list">
    <slot />
  </div>
</template>

<style lang="less" scoped>
.scroll-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  scrollbar-width: none;
}
</style>
