import focusManager from "@renderer/core/gamepad/focus/focusManager.js";
import { gamepadInput } from "@renderer/core/gamepad/input/inputManager";
import { getAppScale } from "@renderer/utils/style";
import { Ref } from "vue";

// 垂直滚动 (让目标元素居中)
export const useVerticalScroll = () => {
  const verticalScroll = () => {
    const appElement = document.getElementById("app-content");
    const targetFocusItem = focusManager.getCurrentElement();
    const targetRect = targetFocusItem?.getBoundingClientRect();
    const prevPressed = gamepadInput.getPrevPressed(); // 上一次触发的按键
    const scale = getAppScale();

    const targetCenter = (targetRect?.y ?? 0) + (targetRect?.height ?? 0) / 2;
    const windowCenter = window.innerHeight / 2;
    const extraJudgmentHeight = 100; // 额外判定高度
    const judgmentHeight = windowCenter + extraJudgmentHeight; // 判定高度

    // 向下滚动
    if (targetCenter > judgmentHeight && prevPressed.has("down")) {
      appElement?.scrollBy({
        top: (targetCenter - windowCenter) / scale,
        behavior: "smooth",
      });
    }
    // 向上滚动
    else if (targetCenter < judgmentHeight && prevPressed.has("up")) {
      appElement?.scrollBy({
        top: -(windowCenter - targetCenter) / scale,
        behavior: "smooth",
      });
    }
  };

  return {
    verticalScroll,
  };
};

// 水平滚动 (让目标元素居中)
export const useHorizontalScroll = () => {
  const horizontalScroll = (scrollListRef: Ref<HTMLElement | null>) => {
    const prevPressed = gamepadInput.getPrevPressed(); // 上一次触发的按钮
    const targetFocusItem = scrollListRef.value?.querySelector(
      ".focused",
    ) as HTMLElement;

    if (!targetFocusItem) return;

    const scale = getAppScale();
    const windowCenter = window.innerWidth / 2;
    const targetRect = targetFocusItem.getBoundingClientRect();

    // 向右滚动
    if (prevPressed.has("right")) {
      scrollListRef.value?.scrollBy({
        left: (targetRect.left - windowCenter + targetRect.width / 2) / scale,
        behavior: "smooth",
      });
    }
    // 向左滚动
    else if (prevPressed.has("left")) {
      scrollListRef.value?.scrollBy({
        left: (targetRect.right - windowCenter - targetRect.width / 2) / scale,
        behavior: "smooth",
      });
    }
  };

  return {
    horizontalScroll,
  };
};
