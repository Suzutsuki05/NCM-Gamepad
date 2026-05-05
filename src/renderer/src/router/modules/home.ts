import type { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/home",
    name: "home",
    component: () => import("@renderer/views/home/index.vue"),
  },
] as RouteRecordRaw[];
