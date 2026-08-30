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
 * @description scopeId 当前订阅者所属的焦点空间
 * @description global 是否忽略当前聚焦范围, 用于页面级输入按键（back等）
 * @description callback 订阅的回调方法, 返回 true 表示该事件已经被使用过了
 * @description enabled 当前订阅者是否可处理输入
 */
export interface Subscriber {
  name: string;
  scopeId: string;
  global?: boolean;
  callback: (state: InputState) => boolean;
  enabled?: () => boolean;
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
