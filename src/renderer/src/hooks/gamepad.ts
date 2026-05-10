import { gamepadInput } from "@renderer/core/gamepad/input/inputManager";
import type { InputState } from "@renderer/core/gamepad/input/typing";
import type { FocusDirection } from "@renderer/core/gamepad/focus/typing";

interface Operation {
  confirm?: () => any;
  back?: () => any;
  secondary?: () => any;
  option?: () => any;
  up?: () => any;
  down?: () => any;
  left?: () => any;
  right?: () => any;
  lb?: () => any;
  rb?: () => any;
  lt?: () => any;
  rt?: () => any;
  view?: () => any;
  menu?: () => any;
  share?: () => any;
}

export const useInputCallback = (name: string) => {
  // 手柄输入回调
  const inputCallback = (operation: Operation) => {
    const {
      confirm,
      back,
      secondary,
      option,
      up,
      down,
      left,
      right,
      lb,
      rb,
      lt,
      rt,
      view,
      menu,
      share,
    } = operation;

    // TODO 适配组合键

    // 回调
    const callback = (state: InputState) => {
      // 交互键
      if (state.justPressed.has("confirm")) return confirm && confirm();
      if (state.justPressed.has("back")) return back && back();
      if (state.justPressed.has("secondary")) return secondary && secondary();
      if (state.justPressed.has("option")) return option && option();

      // 方向键
      if (state.justPressed.has("up")) return up && up();
      if (state.justPressed.has("down")) return down && down();
      if (state.justPressed.has("left")) return left && left();
      if (state.justPressed.has("right")) return right && right();

      // 肩键
      if (state.justPressed.has("lb")) return lb && lb();
      if (state.justPressed.has("rb")) return rb && rb();

      // 扳机键
      if (state.justPressed.has("lt")) return lt && lt();
      if (state.justPressed.has("rt")) return rt && rt();

      // 功能键
      if (state.justPressed.has("view")) return view && view();
      if (state.justPressed.has("menu")) return menu && menu();
      if (state.justPressed.has("share")) return share && share();
    };

    // 自动订阅
    gamepadInput.subscribe({
      name,
      callback,
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

    let bestPriority: number = Infinity;
    let bestElement: HTMLElement | null = null;

    for (const element of elements) {
      if (currentElement === element) continue;

      // 目标元素
      const targetElement = element.getBoundingClientRect();
      // 目标元素 X 坐标
      const targetX = targetElement.left + targetElement.width / 2;
      // 目标元素 Y 坐标
      const targetY = targetElement.top + targetElement.height / 2;

      // 水平方向距离
      const distanceX = targetX - currentX;
      // 垂直方向距离
      const distanceY = targetY - currentY;

      // 方向过滤
      if (direction === "right" && distanceX <= 0) continue;
      if (direction === "left" && distanceX >= 0) continue;
      if (direction === "up" && distanceY >= 0) continue;
      if (direction === "down" && distanceY <= 0) continue;

      // 当前元素和目标元素之间的距离 (勾股定理)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // 角度惩罚
      const anglePenalty =
        direction === "left" || direction === "right"
          ? Math.abs(distanceY)
          : Math.abs(distanceX);

      // 优先级 (越低越优先, 角度偏移权重最高)
      const priority = distance + anglePenalty * 5;

      if (priority < bestPriority) {
        bestPriority = priority;
        bestElement = element;
      }
    }

    return bestElement;
  };

  return { findNextFocus };
};
