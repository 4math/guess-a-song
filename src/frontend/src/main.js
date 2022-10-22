import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementPlus from "element-plus";

const app = createApp(App);

// axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL;
axios.defaults.baseURL = "http://localhost:9091";

app.use(ElementPlus);
app.use(router);

app.mount("#app");
