import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.less";
import "@renderer/assets/iconfont/iconfont";
import Icon from "@renderer/components/Icon/index.vue";
import FocusItem from "@renderer/components/FocusItem/index.vue";
import ModuleTitle from "@renderer/components/ModuleTitle/index.vue";

const components = [
  { name: "Icon", component: Icon },
  { name: "FocusItem", component: FocusItem },
  { name: "ModuleTitle", component: ModuleTitle },
];

const app = createApp(App);

app.use(router);
components.forEach((item) => {
  app.component(item.name, item.component);
});
app.mount("#app");
