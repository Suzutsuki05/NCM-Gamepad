<script lang="ts" setup>
import { onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import ListenNow from "@renderer/views/home/listenNow/index.vue";
import { prefixName } from "../../components/TabBar/config.data";

const { inputCallback, unsubscribe } = useInputCallback("tab-pane", {
  enabled: () => {
    const focusId = focusManager.currentFocusId.value;
    return focusId !== "" && !focusId.startsWith(prefixName);
  },
});

defineProps<{
  selectedTab: string;
}>();

const left = () => {
  console.log("tab-pane left");
  // focusManager.move("left");
};

// const right = () => {
//   focusManager.move("right");
// };

// const up = () => {
//   focusManager.move("up");
// };

// const down = () => {
//   focusManager.move("down");
// };

inputCallback({
  left,
  // right,
  // up,
  // down,
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="tab-pane">
    <!-- 立即聆听 -->
    <div v-show="selectedTab === prefixName + 'listen-now'">
      <ListenNow />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-pane {
}
</style>
