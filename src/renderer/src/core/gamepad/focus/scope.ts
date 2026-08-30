import { inject, provide } from "vue";

const focusScopeKey = Symbol("focus-scope");

// 向范围内的组件提供 范围id
export const provideFocusScope = (scopeId: string) => {
  provide(focusScopeKey, scopeId);
};

// 注入聚焦范围
export const injectFocusScope = () => {
  return inject<string | undefined>(focusScopeKey, undefined);
};
