// 移动聚焦方向
export type FocusDirection = "left" | "right" | "up" | "down";

// 可聚焦目标
export interface FocusTarget {
  element: HTMLElement;
  scopeId: string;
}
