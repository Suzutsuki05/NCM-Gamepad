<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

const props = defineProps<{
  // TODO 多余
  scrollCount?: number; // 滚动个数
}>();

const scrollListRef = ref<HTMLElement | null>(null); // 滚动列表Ref

// 获取滚动一格需要的像素
const getScrollStep = (target: HTMLElement, direction: "left" | "right") => {
  const scrollList = scrollListRef.value?.querySelector(".scroll-list");
  const items = [...(scrollList?.children ?? [])] as HTMLElement[];
  const targetIndex = items.findIndex((item) => item === target);

  if (targetIndex === -1) return target.offsetWidth;

  // 用目标元素相对于目标前或后一个元素的距离
  const nextItem = items[targetIndex + 1];
  const prevItem = items[targetIndex - 1];

  if (direction === "right" && nextItem) {
    return nextItem.offsetLeft - target.offsetLeft;
  }

  if (direction === "left" && prevItem) {
    return target.offsetLeft - prevItem.offsetLeft;
  }

  return target.offsetWidth;
};

watch(
  () => focusManager.currentFocusId.value,
  async () => {
    await nextTick();

    const targetFocusItem = scrollListRef.value?.querySelector(
      ".focused",
    ) as HTMLElement;

    if (!targetFocusItem) return;

    const scrollWrap = scrollListRef.value;
    if (!scrollWrap) return;

    const targetRect = targetFocusItem.getBoundingClientRect();
    const scrollWrapRect = scrollWrap.getBoundingClientRect();

    // 向右滚动
    if (targetRect.right > scrollWrapRect.right) {
      scrollWrap.scrollBy({
        left: getScrollStep(targetFocusItem, "right"),
        behavior: "smooth",
      });
    }
    // 向左滚动
    else if (targetRect.left < scrollWrapRect.left) {
      scrollWrap.scrollBy({
        left: -getScrollStep(targetFocusItem, "left"),
        behavior: "smooth",
      });
    }
  },
);
</script>

<template>
  <div ref="scrollListRef" class="scroll-list-wrap">
    <div class="scroll-list">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.scroll-list-wrap {
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;

  .scroll-list {
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
