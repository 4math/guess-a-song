import { createRouter, createWebHistory } from "vue-router";
import TodoComponent from "../components/Todo.vue";
import LeaderBoardComponent from "../components/LeaderBoard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodoComponent,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderBoardComponent,
    },
  ],
});

export default router;
