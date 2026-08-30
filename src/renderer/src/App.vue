<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import BasicLayouts from "./layouts/BasicLayouts.vue";
import { gamepadInput } from "./core/gamepad/input/inputManager";

// TODO del
// import Versions from "./components/Versions.vue";
// const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

// 初始化
const init = () => {
  gamepadInput.start();
};

// 变更缩放比例
const updateScale = () => {
  const BASE_WIDTH = 1280;
  const scale = window.innerWidth / BASE_WIDTH;
  const appHeight = window.innerHeight / scale;

  document.documentElement.style.setProperty("--scale", scale.toString());
  document.documentElement.style.setProperty("--app-height", `${appHeight}px`);
};

onMounted(() => {
  init();
  updateScale();
  window.addEventListener("resize", updateScale);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScale);
});
</script>

<template>
  <div id="app-content">
    <BasicLayouts />
  </div>
</template>

<style lang="less" scoped>
#app-content {
  width: 1280px;
  height: var(--app-height, 100vh);
  overflow-x: hidden;
  overflow-y: auto;
  transform-origin: top left;
  transform: scale(var(--scale, 1));
  scrollbar-width: none;
}

#app-content::-webkit-scrollbar {
  display: none;
}
</style>
