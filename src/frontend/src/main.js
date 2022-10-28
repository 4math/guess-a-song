import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementPlus from "element-plus";

const app = createApp(App);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

app.use(ElementPlus);
app.use(router);

app.mount("#app");
