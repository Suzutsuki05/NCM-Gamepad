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
    path: "/album-details",
    name: "album-details",
    component: () => import("@renderer/views/albumDetails/index.vue"),
  },
  // 音乐播放页
  {
    path: "/music-playback",
    name: "music-playback",
    component: () => import("@renderer/views/musicPlayback/index.vue"),
  },
] as RouteRecordRaw[];
