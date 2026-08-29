<script lang="ts" setup>
import { prefixName } from "./config.data";

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <FocusItem class="large-card" :focus-id="prefixName + id">
    <div class="card">
      <div class="info"></div>
      <div class="cover">
        <img class="cover-image" />
        <div class="info"></div>
      </div>
    </div>
  </FocusItem>
</template>

<style lang="less" scoped>
.focus-item {
  margin-left: 30px;

  &:first-child {
    margin-left: 0;
    padding-left: 54px;
  }

  &:last-child {
    margin-right: 0;
    padding-right: 54px;
  }
}

.large-card {
  .card {
    width: 570px;
    height: 300px;

    border: 1px solid red;

    .info {
    }

    .cover {
    }
  }
}

.focused {
  background: lightpink;
}
</style>
