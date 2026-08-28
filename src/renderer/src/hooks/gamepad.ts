import { gamepadInput } from "@renderer/core/gamepad/input/inputManager";
import type { Action, InputState } from "@renderer/core/gamepad/input/typing";
import type { FocusDirection } from "@renderer/core/gamepad/focus/typing";

interface Operation extends Partial<Record<Action, () => unknown>> {}

interface UseInputCallbackOptions {
  name?: string;
  enabled?: () => boolean;
}

const actionOrder: Action[] = [
  "confirm",
  "back",
  "secondary",
  "option",
  "up",
  "down",
  "left",
  "right",
  "lb",
  "rb",
  "lt",
  "rt",
  "view",
  "menu",
  "share",
];

export const useInputCallback = (
  scopeId: string,
  options: UseInputCallbackOptions = {},
) => {
  const { name = scopeId, enabled } = options;

  // 手柄输入回调
  const inputCallback = (operation: Operation) => {
    // TODO 适配组合键
    // TODO 适配长按有规律的持续触发

    // 回调
    const callback = (state: InputState) => {
      for (const action of actionOrder) {
        const handler = operation[action];

        if (!state.justPressed.has(action) || !handler) continue;

        handler();
        return true;
      }

      return false;
    };

    // 自动订阅
    gamepadInput.subscribe({
      name,
      scopeId,
      callback,
      enabled,
    });
  };

  // 取消订阅
  const unsubscribe = () => {
    gamepadInput.unsubscribe(name);
  };

  return {
    inputCallback,
    unsubscribe,
  };
};

export const useFindNextFocus = () => {
  // 判断两个元素在垂直方向上的投影是否有交集
  const hasVerticalOverlap = (rectA: DOMRect, rectB: DOMRect) => {
    const overlap =
      Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top);

    return overlap > Math.min(rectA.height, rectB.height) / 2;
  };

  // 寻找下一个焦点
  const findNextFocus = (
    direction: FocusDirection,
    currentElement: HTMLElement,
    elements: HTMLElement[],
  ) => {
    // 当前元素
    const currentRect = currentElement.getBoundingClientRect();
    // 当前元素 X 坐标
    const currentX = currentRect.left + currentRect.width / 2;
    // 当前元素 Y 坐标
    const currentY = currentRect.top + currentRect.height / 2;

    let bestScore: number = Infinity;
    let bestElement: HTMLElement | null = null;

    for (const element of elements) {
      if (currentElement === element) continue;

      // 目标元素
      const targetRect = element.getBoundingClientRect();
      // 目标元素 X 坐标
      const targetX = targetRect.left + targetRect.width / 2;
      // 目标元素 Y 坐标
      const targetY = targetRect.top + targetRect.height / 2;

      // 水平方向距离
      const distanceX = targetX - currentX;
      // 垂直方向距离
      const distanceY = targetY - currentY;

      // 方向过滤
      if (direction === "right" && distanceX <= 0) continue;
      if (direction === "left" && distanceX >= 0) continue;
      if (direction === "up" && distanceY >= 0) continue;
      if (direction === "down" && distanceY <= 0) continue;

      // 横向移动只在当前行内查找，避免行末继续跳到下一行元素
      if (
        (direction === "left" || direction === "right") &&
        !hasVerticalOverlap(currentRect, targetRect)
      ) {
        continue;
      }

      // 当前元素和目标元素之间的距离 (勾股定理)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // 角度惩罚
      const anglePenalty =
        direction === "left" || direction === "right"
          ? Math.abs(distanceY)
          : Math.abs(distanceX);

      // 优先级 (越低越优先, 角度偏移权重最高)
      const score = distance + anglePenalty * 5;

      if (score < bestScore) {
        bestScore = score;
        bestElement = element;
      }
    }

    return bestElement;
  };

  return { findNextFocus };
};
