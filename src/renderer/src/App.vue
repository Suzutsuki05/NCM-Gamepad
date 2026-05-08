<script setup lang="ts">
import { onMounted } from "vue";
import BasicLayouts from "./layouts/BasicLayouts.vue";

import { gamepadInput } from "./core/gamepad/input";

// TODO del
// import Versions from "./components/Versions.vue";
// const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

// 初始化
const init = () => {
  gamepadInput.start();
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="app">
    <BasicLayouts />
  </div>
</template>
