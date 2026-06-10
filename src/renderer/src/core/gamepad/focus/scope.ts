import { inject, provide } from "vue";

const focusScopeKey = Symbol("focus-scope");

// 提供聚焦范围
export const provideFocusScope = (scopeId: string) => {
  provide(focusScopeKey, scopeId);
};

// 注入聚焦范围
export const injectFocusScope = () => {
  return inject<string | undefined>(focusScopeKey, undefined);
};
