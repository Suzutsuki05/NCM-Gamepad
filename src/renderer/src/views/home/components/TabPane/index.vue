<script lang="ts" setup>
import { onUnmounted } from "vue";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import { provideFocusScope } from "@renderer/core/gamepad/focus/scope";
import ListenNow from "@renderer/views/home/listenNow/index.vue";
import { focusScopeId as tabBarFocusScopeId } from "../../components/TabBar/config.data";

const focusScopeId = "tab-pane";

provideFocusScope(focusScopeId);

const { inputCallback, unsubscribe } = useInputCallback(focusScopeId);

defineProps<{
  selectedTab: string;
}>();

const left = () => {
  focusManager.move("left");
};

const right = () => {
  focusManager.move("right");
};

const up = () => {
  focusManager.move("up");
};

const down = () => {
  focusManager.move("down");
};

inputCallback({
  left,
  right,
  up,
  down,
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="tab-pane">
    <!-- 立即聆听 -->
    <div v-show="selectedTab === `${tabBarFocusScopeId}-listen-now`">
      <ListenNow />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-pane {
}
</style>
