<script lang="ts" setup>
import { ref, watch, onMounted, provide } from "vue";
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

const selectedTab = ref<string>(""); // 当前选中tab
const isShowTab = ref<boolean>(true); // 是否显示tab

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

// 设置tab bar显示状态
const setTabBarVisible = (visible: boolean) => {
  isShowTab.value = visible;
};

// 初始化数据
const initData = () => {
  // 默认聚焦"立即聆听"
  // focusManager.setFocus(`${tabBarFocusScopeId}-listen-now`, tabBarFocusScopeId);

  // TODO del 开发用暂时选中
  focusManager.setFocus(
    `${tabBarFocusScopeId}-playing-now`,
    tabBarFocusScopeId,
  );
};

onMounted(() => {
  initData();
});

provide("home-context", { setTabBarVisible });
</script>

<template>
  <div class="home">
    <TabBar :selectedTab="selectedTab" v-show="isShowTab" />
    <TabPane :selectedTab="selectedTab" />
  </div>
</template>

<style lang="less" scoped>
.home {
  height: 100%;
  position: relative;
}
</style>
