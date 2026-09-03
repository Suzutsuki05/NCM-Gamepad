<script lang="ts" setup></script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="['Home']">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style lang="less" scoped></style>
