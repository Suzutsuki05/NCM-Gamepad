import { useRouter } from "vue-router";

interface TransitionalPageParams {
  id: string; // 详情id
  title: string; // 标题内容
  fromRouteName: string; // 来源页面名称
  toRouteName: string; // 前往页面名称
}

// 使用过渡页的跳转方法
export const useJumpTransitionalPage = () => {
  const router = useRouter();

  const jumpTransitionalPage = (params: TransitionalPageParams) => {
    const { id, title, fromRouteName, toRouteName } = params;
    router.push({
      name: "transitional-page",
      query: {
        id,
        title,
        fromRouteName,
        toRouteName,
      },
    });
  };

  return {
    jumpTransitionalPage,
  };
};
