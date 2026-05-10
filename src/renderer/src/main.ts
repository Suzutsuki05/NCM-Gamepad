import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import "@renderer/assets/iconfont/iconfont";
import Icon from "@renderer/components/Icon/index.vue";
import FocusItem from "@renderer/components/FocusItem/index.vue";

const app = createApp(App);

app.use(router);
app.component("Icon", Icon);
app.component("FocusItem", FocusItem);
app.mount("#app");
