<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import TabBar from "./components/TabBar/index.vue";
import TabPane from "./components/TabPane/index.vue";
import {
  focusScopeId as tabBarFocusScopeId,
  tabsList,
} from "./components/TabBar/config.data";

defineOptions({
  name: "Home",
});

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
  focusManager.setFocus(`${tabBarFocusScopeId}-listen-now`, tabBarFocusScopeId);

  // TODO del 开发用暂时选中
  // focusManager.setFocus(
  //   `${tabBarFocusScopeId}-playing-now`,
  //   tabBarFocusScopeId,
  // );
};

onMounted(() => {
  initData();
});
</script>

<template>
  <div class="home">
    <TabBar :selectedTab="selectedTab" />
    <TabPane :selectedTab="selectedTab" />
  </div>
</template>

<style lang="less" scoped>
.home {
  position: relative;
}
</style>
