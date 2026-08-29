import focusManager from "@renderer/core/gamepad/focus/focusManager.js";
import { gamepadInput } from "@renderer/core/gamepad/input/inputManager";

// 垂直滚动
export const useVerticalScroll = () => {
  const verticalScroll = () => {
    const appElement = document.getElementById("app");
    const targetFocusItem = focusManager.getCurrentElement();
    const targetRect = targetFocusItem?.getBoundingClientRect();
    const prevPressed = gamepadInput.getPrevPressed(); // 上一次触发的按键

    const targetCenter = (targetRect?.y ?? 0) + (targetRect?.height ?? 0) / 2;
    const windowCenter = window.innerHeight / 2;
    const extraJudgmentHeight = 100; // 额外判定高度
    const judgmentHeight = windowCenter + extraJudgmentHeight; // 判定高度

    // 向下滚动
    if (targetCenter > judgmentHeight && prevPressed.has("down")) {
      appElement?.scrollBy({
        top: targetCenter - windowCenter,
        behavior: "smooth",
      });
    }
    // 向上滚动
    else if (targetCenter < judgmentHeight && prevPressed.has("up")) {
      appElement?.scrollBy({
        top: -(windowCenter - targetCenter),
        behavior: "smooth",
      });
    }
  };

  return {
    verticalScroll,
  };
};
