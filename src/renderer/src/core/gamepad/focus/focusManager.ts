import { ref } from "vue";
import { useFindNextFocus } from "@renderer/hooks/gamepad";
import type {
  FocusDirection,
  FocusTarget,
  ScopeFocusResolver,
  ScopeFocusResolverContext,
} from "./typing";

const { findNextFocus } = useFindNextFocus();

class FocusManager {
  currentFocusId = ref<string>(""); // 当前聚焦元素的id
  focusMap = new Map<string, FocusTarget>(); // 所有的可聚焦元素
  fromScopeId = ref<string>(""); // 上一次聚焦的范围id
  scopeResolvers = new Map<string, ScopeFocusResolver>(); // 范围焦点解析器

  // 注册为可聚焦元素
  register(id: string, element: HTMLElement, scopeId: string) {
    this.focusMap.set(id, {
      element,
      scopeId,
    });
  }

  // 取消注册
  unregister(id: string) {
    this.focusMap.delete(id);
  }

  // 设置聚焦
  setFocus(id: string, scopeId: string) {
    if (!this.focusMap.has(id)) return;
    this.currentFocusId.value = id;
    this.fromScopeId.value = scopeId;
  }

  // 设置范围焦点解析器
  setScopeFocusResolver(scopeId: string, resolver: ScopeFocusResolver) {
    this.scopeResolvers.set(scopeId, resolver);
  }

  // 移除范围焦点解析器
  removeScopeFocusResolver(scopeId: string) {
    this.scopeResolvers.delete(scopeId);
  }

  // 是否被聚焦
  isFocus(id: string) {
    return this.currentFocusId.value === id;
  }

  // 获取当前聚焦的scope
  getCurrentScopeId() {
    return this.focusMap.get(this.currentFocusId.value)?.scopeId ?? "";
  }

  // 获取当前聚焦的元素
  getCurrentElement() {
    return this.focusMap.get(this.currentFocusId.value)?.element;
  }

  // 是否为可见元素
  private isVisible(element: HTMLElement) {
    return element.getClientRects().length > 0;
  }

  // 获取范围内可见的聚焦目标
  private getScopeTargets(scopeId: string) {
    return [...this.focusMap.entries()]
      .filter(([, target]) => {
        return target.scopeId === scopeId && this.isVisible(target.element);
      })
      .map(([id, target]) => ({
        id,
        ...target,
      }));
  }

  // 获取范围内第一个可见聚焦目标
  private getScopeFirstId(scopeId: string) {
    return this.getScopeTargets(scopeId)[0]?.id ?? "";
  }

  // 解析进入范围后的聚焦目标
  private getScopeFocusId(scopeId: string, context: ScopeFocusResolverContext) {
    const resolver = this.scopeResolvers.get(scopeId);
    const resolvedFocusId = resolver?.(context);

    if (resolvedFocusId && this.focusMap.has(resolvedFocusId)) {
      return resolvedFocusId;
    }

    return this.getScopeFirstId(scopeId) || context.fallbackFocusId;
  }

  // 移动焦点
  move(direction: FocusDirection) {
    // 当前元素
    const currentElement = this.getCurrentElement();
    let targetId = ""; // 目标元素id
    let targetScopeId = ""; // 目标元素范围id

    if (!currentElement) return;

    // 所有可聚焦元素
    const elements = [...this.focusMap.values()]
      .map((target) => target.element)
      .filter((element) => this.isVisible(element));

    // 查找下一个元素
    const nextElement = findNextFocus(direction, currentElement, elements);

    if (!nextElement) return;

    // 找到对应的id
    for (const [id, target] of this.focusMap.entries()) {
      if (nextElement === target.element) {
        targetId = id;
        targetScopeId = target.scopeId;
        break;
      }
    }

    if (!targetId) return;

    // 跨范围聚焦后设置初始聚焦元素
    const fromScopeId = this.fromScopeId.value;
    const isNewScope = fromScopeId !== targetScopeId;
    const nextFocusId = isNewScope
      ? this.getScopeFocusId(targetScopeId, {
          direction,
          fromScopeId,
          toScopeId: targetScopeId,
          fallbackFocusId: targetId,
        })
      : targetId;

    this.setFocus(isNewScope ? nextFocusId : targetId, targetScopeId);
  }
}

export default new FocusManager();
