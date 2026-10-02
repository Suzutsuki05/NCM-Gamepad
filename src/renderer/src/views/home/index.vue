<script lang="ts" setup>
import { ref, watch, onMounted, provide } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import TabBar from "./components/TabBar/index.vue";
import TabPane from "./components/TabPane/index.vue";
import {
  focusScopeId as tabBarFocusScopeId,
  tabsList,
} from "./components/TabBar/config.data";
import { HomeContext } from "./typing.js";

defineOptions({
  name: "Home",
});

const backgroundRef = ref<HTMLElement | null>(null); // 主页Ref
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

// 设置背景颜色 (不传参重置默认背景色)
const setBackgroundColor = (
  color: string = "var(--background-color)",
  transitionTime: number = 3,
) => {
  const target = backgroundRef.value;
  if (!target) return;
  target.style.backgroundColor = color;
  target.style.transition = `background ${transitionTime}s`;
};

// 设置tab-bar显示状态
const setTabBarVisible = (visible: boolean) => {
  isShowTab.value = visible;
};

// 设置tab-bar选中值
const setTabBarSelectedValue = (focusScopeId: string) => {
  focusManager.setFocus(
    `${tabBarFocusScopeId}-${focusScopeId}`,
    tabBarFocusScopeId,
  );
};

// 初始化数据
const initData = () => {
  // 默认聚焦"立即聆听"
  // setTabBarSelectedValue("listen-now");

  // TODO del
  setTabBarSelectedValue("playing-now");
};

onMounted(() => {
  initData();
});

// 提供上下文
provide("home-context", {
  selectedTab,
  setBackgroundColor,
  setTabBarVisible,
  setTabBarSelectedValue,
} as HomeContext);
</script>

<template>
  <div class="home">
    <TabBar :selectedTab="selectedTab" v-show="isShowTab" />
    <TabPane />
    <div class="background" ref="backgroundRef"></div>
  </div>
</template>

<style lang="less" scoped>
.home {
  min-height: var(--app-height, 100vh);
  position: relative;

  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -5;
    background: var(--background-color);
  }
}
</style>
