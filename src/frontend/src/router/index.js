import { createRouter, createWebHistory } from "vue-router";
import LeaderBoardComponent from "../components/LeaderBoard.vue";
import HomeScreen from "../components/HomeScreen.vue";
import GameController from "../components/game/GameController.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeScreen,
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
