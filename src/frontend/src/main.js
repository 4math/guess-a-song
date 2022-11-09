import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import mitt from "mitt";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";

const app = createApp(App);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const emitter = mitt();

app.use(ElementPlus);
app.use(router);
app.config.globalProperties.$emitter = emitter;

app.mount("#app");
