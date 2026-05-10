<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

const props = defineProps<{
  focusId: string;
}>();

const elementRef = ref<HTMLElement>();

// 是否处于聚焦状态
const focused = computed(() => {
  return focusManager.isFocus(props.focusId);
});

onMounted(() => {
  if (!elementRef.value) return;
  focusManager.register(props.focusId, elementRef.value);
});

onUnmounted(() => {
  focusManager.unregister(props.focusId);
});
</script>

<template>
  <div ref="elementRef" :class="{ focused }">
    <slot />
  </div>
</template>
