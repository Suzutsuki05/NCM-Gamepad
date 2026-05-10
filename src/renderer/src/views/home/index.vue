<script lang="ts" setup>
import { onMounted } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import TabBar from "./components/TabBar/index.vue";
import { prefixName as tabBarPrefixName } from "./components/TabBar/config.data";

// 初始化数据
const initData = () => {
  focusManager.setFocus(tabBarPrefixName + "1");
};

onMounted(() => {
  initData();
});
</script>

<template>
  <div class="home">
    <div class="header">
      <TabBar />
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 32px;
  }
}
</style>
