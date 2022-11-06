import { createRouter, createWebHistory } from "vue-router";
import TodoComponent from "../components/Todo.vue";
import LeaderBoardComponent from "../components/LeaderBoard.vue";
import GameController from "../components/game/GameController.vue";

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
    {
      path: "/play",
      name: "play",
      component: GameController,
    },
  ],
});

export default router;
