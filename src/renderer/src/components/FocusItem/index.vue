<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";
import { injectFocusScope } from "@renderer/core/gamepad/focus/scope";

const props = defineProps<{
  focusId: string;
  scopeId?: string;
}>();

const elementRef = ref<HTMLElement>();
const inheritedScopeId = injectFocusScope();

// 是否处于聚焦状态
const focused = computed(() => {
  return focusManager.isFocus(props.focusId);
});

onMounted(() => {
  if (!elementRef.value) return;
  const resolvedScopeId = props.scopeId ?? inheritedScopeId ?? props.focusId;

  if (!props.scopeId && !inheritedScopeId) {
    console.warn(
      `[FocusItem] ${props.focusId} 未声明 scopeId, 将使用 focusId 作为默认 scopeId`,
    );
  }

  focusManager.register(props.focusId, elementRef.value, resolvedScopeId);
});

onUnmounted(() => {
  focusManager.unregister(props.focusId);
});
</script>

<template>
  <div ref="elementRef" class="focus-item" :class="{ focused }">
    <slot />
  </div>
</template>
