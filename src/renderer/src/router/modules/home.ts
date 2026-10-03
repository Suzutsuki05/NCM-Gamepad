import type { RouteRecordRaw } from "vue-router";

export default [
  // 主页
  {
    path: "/home",
    name: "home",
    component: () => import("@renderer/views/home/index.vue"),
  },
  // 过度页
  {
    path: "/transitional-page",
    name: "transitional-page",
    component: () => import("@renderer/views/transitionalPage/index.vue"),
  },
  // 专辑详情
  {
    path: "/song-details",
    name: "song-details",
    component: () => import("@renderer/views/songDetails/index.vue"),
  },
] as RouteRecordRaw[];
