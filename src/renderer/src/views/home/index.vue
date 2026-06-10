<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import TabBar from "./components/TabBar/index.vue";
import TabPane from "./components/TabPane/index.vue";
import {
  focusScopeId as tabBarFocusScopeId,
  tabsList,
} from "./components/TabBar/config.data";

// 当前选中tab
const selectedTab = ref<string>("");

// 设置选中tab
watch(
  () => focusManager.currentFocusId.value,
  (focusId) => {
    if (
      tabsList.findIndex(
        (item) => `${tabBarFocusScopeId}-${item.key}` === focusId,
      ) === -1
    )
      return;
    selectedTab.value = focusId;
  },
);

// 初始化数据
const initData = () => {
  // 默认聚焦"立即聆听"
  focusManager.setFocus(`${tabBarFocusScopeId}-listen-now`);
};

onMounted(() => {
  initData();
});
</script>

<template>
  <div class="home">
    <div class="header">
      <TabBar :selectedTab="selectedTab" />
    </div>
    <div class="content">
      <TabPane :selectedTab="selectedTab" />
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
