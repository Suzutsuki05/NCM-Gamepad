import focusManager from "@renderer/core/gamepad/focus/focusManager";

// TODO 做成可选默认值 或者 可自定义移除某个默认输入功能
// 上下左右 移动
export const useDefaultInputHandlers = () => {
  return {
    left: () => focusManager.move("left"),
    right: () => focusManager.move("right"),
    up: () => focusManager.move("up"),
    down: () => focusManager.move("down"),

    confirm: () => focusManager.confirmCurrent(),
  };
};
