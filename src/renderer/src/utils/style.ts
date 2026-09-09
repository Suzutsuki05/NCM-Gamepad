// 获取根CSS数值
export const getRootCssNumber = (name: string, fallback = 0) => {
  const value = Number(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );

  return value || fallback;
};

// 获取页面缩放
export const getAppScale = () => {
  return getRootCssNumber("--scale", 1);
};
