import { ref } from "vue";
import { useFindNextFocus } from "@renderer/hooks/gamepad";
import type { FocusDirection } from "./typing";

const { findNextFocus } = useFindNextFocus();

class FocusManager {
  currentFocusId = ref<string>(""); // 当前聚焦元素的id
  focusMap = new Map<string, HTMLElement>(); // 所有的可聚焦元素

  // 注册为可聚焦元素
  register(id: string, element: HTMLElement) {
    this.focusMap.set(id, element);
  }

  // 取消注册
  unregister(id: string) {
    this.focusMap.delete(id);
  }

  // 设置聚焦
  setFocus(id: string) {
    if (!this.focusMap.has(id)) return;
    this.currentFocusId.value = id;
  }

  // 是否被聚焦
  isFocus(id: string) {
    return this.currentFocusId.value === id;
  }

  // 获取当前聚焦的元素
  getCurrentElement() {
    return this.focusMap.get(this.currentFocusId.value);
  }

  // 移动焦点
  move(direction: FocusDirection) {
    // 当前元素
    const currentElement = this.getCurrentElement();

    if (!currentElement) return;

    // 所有可聚焦元素
    const elements = [...this.focusMap.values()];

    // 查找下一个元素
    const nextElement = findNextFocus(direction, currentElement, elements);

    if (!nextElement) return;

    // 找到对应的Id
    for (const [id, element] of this.focusMap.entries()) {
      if (nextElement === element) {
        this.setFocus(id);
        break;
      }
    }
  }
}

export default new FocusManager();
