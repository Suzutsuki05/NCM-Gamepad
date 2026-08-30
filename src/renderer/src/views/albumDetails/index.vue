<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useInputCallback } from "@renderer/hooks/gamepad";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

import { focusScopeId } from "./config.data";
import { onUnmounted } from "vue";

const { inputCallback, unsubscribe } = useInputCallback(focusScopeId, {
  global: true,
});

const route = useRoute();
const router = useRouter();

const back = () => {
  console.log("details back");

  // TODO 这样写不好
  router.go(-2);
};

inputCallback({
  back,
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="album">albumDetails</div>
</template>

<style lang="less" scoped>
.album {
}
</style>
