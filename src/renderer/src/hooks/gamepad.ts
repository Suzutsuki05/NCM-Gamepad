import type { InputState } from "@renderer/core/gamepad/typing";
import { gamepadInput } from "@renderer/core/gamepad/input";

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

// 手柄按键输入回调
export const useGamepadInputCallback = (name: string, operation: Operation) => {
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

  // 手柄输入回调
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

  // 订阅
  gamepadInput.subscribe({
    name,
    callback,
  });

  // 取消订阅
  const unsubscribe = () => {
    gamepadInput.unsubscribe(name);
  };

  return {
    unsubscribe,
  };
};
