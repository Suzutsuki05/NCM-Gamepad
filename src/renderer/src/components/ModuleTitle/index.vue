<script lang="ts" setup>
defineProps<{
  title: string;
  marginLeft?: number;
}>();
</script>

<template>
  <div class="module-title" :style="`margin-left: ${marginLeft ?? 0}px;`">
    {{ title }}
  </div>
</template>

<style lang="less" scoped>
.module-title {
  margin-bottom: 12px;
  color: #9ba09c;
  font-size: 25px;
  font-weight: bold;
  line-height: 100%;
}
</style>
