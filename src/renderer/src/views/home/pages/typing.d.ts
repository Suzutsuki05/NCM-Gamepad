// 主页上下文
export interface HomeContext {
  setBackgroundColor: (color?: string) => void; // 设置背景颜色
  setTabBarVisible: (visible: boolean) => void; // 设置tab bar显示状态
  setTabBarSelectedValue: (focusScopeId: string) => void; // 设置tab bar选中值
}
