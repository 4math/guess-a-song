import { createRouter, createWebHistory } from "vue-router";
import TodoComponent from "../components/Todo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodoComponent,
    },
  ],
});

export default router;
