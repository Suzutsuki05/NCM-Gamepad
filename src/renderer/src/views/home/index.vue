<script lang="ts" setup>
import { ref, watch, onMounted, provide } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import TabBar from "./components/TabBar/index.vue";
import TabPane from "./components/TabPane/index.vue";
import {
  focusScopeId as tabBarFocusScopeId,
  tabsList,
} from "./components/TabBar/config.data";
import { HomeContext } from "./pages/typing.js";

defineOptions({
  name: "Home",
});

const homeRef = ref<HTMLElement | null>(null);
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
const setBackgroundColor = (color: string = "var(--background-color)") => {
  const target = homeRef.value;
  if (!target) return;
  target.style.backgroundColor = color;
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

  // TODO del 开发用暂时选中
  setTabBarSelectedValue("playing-now");
};

onMounted(() => {
  initData();
});

// 提供上下文
provide("home-context", {
  setBackgroundColor,
  setTabBarVisible,
  setTabBarSelectedValue,
} as HomeContext);
</script>

<template>
  <div class="home" ref="homeRef">
    <TabBar :selectedTab="selectedTab" v-show="isShowTab" />
    <TabPane :selectedTab="selectedTab" />
  </div>
</template>

<style lang="less" scoped>
.home {
  min-height: var(--app-height, 100vh);
  position: relative;
  background: var(--background-color);
  transition: background 1.5s;
}
</style>
