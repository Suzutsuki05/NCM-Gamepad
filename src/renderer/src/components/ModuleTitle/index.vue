<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <span class="module-title">
    {{ title }}
  </span>
</template>

<style lang="less" scoped>
.module-title {
  color: #9ba09c;
  font-size: 25px;
  font-weight: bold;
  line-height: 100%;
}
</style>
