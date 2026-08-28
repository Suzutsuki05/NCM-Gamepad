import { gamepadConfigMap } from "@renderer/constant/gamepad";
import focusManager from "../focus/focusManager";
import { mapGamepad } from "./mappings";
import type { Action, InputState, Subscriber } from "./typing";

const { deadZone } = gamepadConfigMap;

class GamepadInput {
  private started = false; // 是否已经启动轮询
  private activeGamepadIndex: number | undefined; // 处于活动状态的手柄下标
  private prevPressed = new Set<Action>(); // 上一帧触发的按键
  private subscribers: Subscriber[] = []; // 全部订阅者

  // 获取上一帧触发的按键
  getPrevPressed = () => {
    return this.prevPressed;
  };

  // 订阅前置校验
  private validate(subscriber: Subscriber) {
    // 去空值
    if (subscriber.name === "") {
      console.error("订阅名称不能为空");
      return true;
    }
    return false;
  }

  // 订阅手柄输入功能
  subscribe(subscriber: Subscriber) {
    if (this.validate(subscriber)) return;

    const index = this.subscribers.findIndex(
      (item) => item.name === subscriber.name,
    );

    if (index > -1) {
      this.subscribers[index] = subscriber;
      return;
    }

    this.subscribers.push(subscriber);
  }

  // 取消订阅
  unsubscribe(name: string) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.name !== name,
    );
  }

  // 分发手柄输入值
  private emit(state: InputState) {
    const currentScopeId = focusManager.getCurrentScopeId();
    const subscribers = this.subscribers.filter(
      (subscriber) => subscriber.scopeId === currentScopeId,
    );

    for (const subscriber of subscribers) {
      if (subscriber.callback(state)) break;
    }
  }

  // 开始轮询
  start() {
    if (this.started) return;
    this.started = true;

    // 轮询
    const loop = () => {
      const gamepads = navigator.getGamepads();

      // 自动寻找处于活跃状态的手柄
      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (!gamepad) continue;

        const hasInput =
          gamepad.buttons.some((button) => button.pressed) || // 按键
          gamepad.axes.some((axes) => Math.abs(axes) > deadZone); // 摇杆

        if (hasInput) {
          this.activeGamepadIndex = i;
          break;
        }
      }

      // 当前活跃状态的手柄
      const selectedGamepad =
        this.activeGamepadIndex !== undefined
          ? gamepads[this.activeGamepadIndex]
          : undefined;

      // 手柄操作映射
      if (selectedGamepad) {
        const pressed = mapGamepad(selectedGamepad);
        const justPressed = new Set<Action>();

        // 设置当前按下键的值
        for (const action of pressed) {
          if (!this.prevPressed.has(action)) {
            justPressed.add(action);
          }
        }

        // 更新上一帧状态
        this.prevPressed = pressed;

        // 返回触发值
        if (pressed.size || justPressed.size) {
          const state = {
            pressed,
            justPressed,
          };
          this.emit(state);
        }
      }

      // TODO 后期可以改成自定义轮询率

      // 下一帧继续轮询
      requestAnimationFrame(loop);
    };

    loop();
  }
}

export const gamepadInput = new GamepadInput();
