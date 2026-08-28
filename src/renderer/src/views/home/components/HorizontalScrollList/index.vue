<script lang="ts" setup>
import { nextTick, ref, watch, computed } from "vue";
import focusManager from "@renderer/core/gamepad/focus/focusManager";

const props = withDefaults(
  defineProps<{
    scrollCount?: number; // TODO 滚动个数  多余?

    titlePaddingLeft?: number; // 标题左边距
    titleBeforeMoveUpValue?: number; // 标题上移前底部间距
    titleMoveUpValue?: number; // 标题上移后底部间距
    safeScaleTop?: number; // 上缩放安全边距
    safeScaleBottom?: number; // 下缩放安全边距
  }>(),
  {
    titlePaddingLeft: 54,
    titleBeforeMoveUpValue: 0,
    titleMoveUpValue: 0,
    safeScaleTop: 23,
    safeScaleBottom: 18,
  },
);

const titleRef = ref<HTMLElement | null>(null); // 标题Ref
const scrollListRef = ref<HTMLElement | null>(null); // 滚动列表Ref
const isTitleMoveUp = ref<boolean>(false); // 标题是否向上移动

// 列表动态样式
const listDynamicStyle = computed(() => {
  const paddingTop = `padding-top: ${props.safeScaleTop}px;`;
  const paddingBottom = `padding-bottom: ${props.safeScaleBottom}px;`;
  return paddingTop + paddingBottom;
});

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

    isTitleMoveUp.value = false;
    const titleRect = titleRef.value?.getBoundingClientRect();
    const targetFocusItem = scrollListRef.value?.querySelector(
      ".focused",
    ) as HTMLElement;

    if (!targetFocusItem) return;

    const scrollWrap = scrollListRef.value;
    if (!scrollWrap) return;

    const targetRect = targetFocusItem.getBoundingClientRect();
    const scrollWrapRect = scrollWrap.getBoundingClientRect();

    // TODO 1.25 的倍率要定制化，每一个类型的卡片缩放倍率都是不一样的
    // 设置标题上移
    if (titleRect && titleRect?.width > targetRect.left / 1.25) {
      isTitleMoveUp.value = true;
    }

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
  <div class="title-wrap" :style="`padding-left: ${titlePaddingLeft}px`">
    <div
      ref="titleRef"
      class="title"
      :style="`transform: translateY(${!isTitleMoveUp ? titleBeforeMoveUpValue : -titleMoveUpValue}px);`"
    >
      <slot name="title" />
    </div>
  </div>
  <div ref="scrollListRef" class="scroll-list-wrap" :style="listDynamicStyle">
    <div class="scroll-list">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
@transition-duration: 0.2s; // 过度时间

.title-wrap {
  display: flex;
  justify-content: flex-start;

  .title {
    transition: all @transition-duration;
  }
}

.scroll-list-wrap {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;

  .scroll-list {
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
