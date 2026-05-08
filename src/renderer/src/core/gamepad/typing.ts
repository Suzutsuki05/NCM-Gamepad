/**
 * 手柄按键动作 (Xbox风格)
 * A -> confirm
 * B -> back
 * X -> secondary
 * Y -> option
 */
export type Action =
  // 交互键
  | "confirm"
  | "back"
  | "secondary"
  | "option"
  // 方向键
  | "up"
  | "down"
  | "left"
  | "right"
  // 肩键
  | "lb"
  | "rb"
  // 扳机键
  | "lt"
  | "rt"
  // 功能键
  | "view"
  | "menu"
  | "share";

/**
 * 手柄操作集合
 */
export type ActionMap = Set<Action>;

/**
 * 订阅者
 * @description name 订阅者名称
 * @description callback 订阅的回调方法
 */
export interface Subscriber {
  name: string;
  callback: (state: InputState) => void;
}

/**
 * 手柄输入状态
 * @description pressed 当前正在按住键
 * @description justPressed 当前刚按下键
 */
export interface InputState {
  pressed: ActionMap;
  justPressed: ActionMap;
}
