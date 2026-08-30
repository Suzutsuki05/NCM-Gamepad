// 移动聚焦方向
export type FocusDirection = "left" | "right" | "up" | "down";

// 可聚焦目标
export interface FocusTarget {
  element: HTMLElement;
  scopeId: string;
  onConfirm?: () => void; // 确认按钮
}

// 进入范围时的聚焦解析参数
export interface ScopeFocusResolverContext {
  direction: FocusDirection;
  fromScopeId: string;
  toScopeId: string;
  fallbackFocusId: string;
}

// 进入范围时的聚焦解析器
export type ScopeFocusResolver = (
  context: ScopeFocusResolverContext,
) => string | null | undefined;
