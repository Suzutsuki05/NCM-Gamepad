import { RouteRecordRaw } from "vue-router";
import BasicLayouts from "@renderer/layouts/BasicLayouts.vue";
import home from "./modules/home";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "app",
    meta: {
      title: "app",
    },
    redirect: "/home",
    component: BasicLayouts,
    children: [...home],
  },
];

export default routes;
