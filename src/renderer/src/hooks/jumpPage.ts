import { useRouter } from "vue-router";

interface TransitionalPageParams {
  id: string; // 详情id
  title: string; // 标题内容
  fromRoutePath: string; // 来源页面路径
  toRoutePath: string; // 前往页面路径
}

// 使用过渡页的跳转方法
export const useJumpTransitionalPage = () => {
  const router = useRouter();

  const jumpTransitionalPage = (params: TransitionalPageParams) => {
    const { id, title, fromRoutePath, toRoutePath } = params;
    router.push({
      path: "/transitional-page",
      query: {
        id,
        title,
        fromRoutePath,
        toRoutePath,
      },
    });
  };

  return {
    jumpTransitionalPage,
  };
};
