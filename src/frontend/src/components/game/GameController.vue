<template>
  <PreparationScreen
    :round="round"
    :genre="genre"
    :what-to-guess="whatToGuess"
    @done-counting="preparationScreenReady"
    v-if="currentScreen === 1"
  />
  <GuessingScreen
    :answers="answers"
    :correctAnswer="correctAnswer"
    :songLink="songLink"
    :fullAnswer="fullAnswer"
    @done-guessing="guessingScreenReady"
    v-if="currentScreen === 2"
  />
</template>

<script>
import PreparationScreen from "./PreparationScreen.vue";
import GuessingScreen from "./GuessingScreen.vue";
import axios from "axios";
export default {
  name: "GameController",
  components: {
    GuessingScreen,
    PreparationScreen,
  },
  data() {
    return {
      currentScreen: 1,
      round: 1,
      genre: "",
      whatToGuess: "",
      gameId: "",
      userId: "",
      answers: [],
      correctAnswer: "",
      songLink: "",
      score: 0,
      fullAnswer: "",
    };
  },
  async created() {
    this.genre = localStorage.getItem("genre");
    this.gameId = localStorage.getItem("gameId");
    this.userId = localStorage.getItem("userId");
    await this.getMaterial();
  },
  methods: {
    async endGame() {
      await axios.put(`/api/game/${this.gameId}`);
      this.score = await axios.post("api/leaderboard", {
        userId: this.userId,
        gameId: this.gameId,
      });
      this.$router.push("/leaderboard");
    },
    async guessingScreenReady(roundScore) {
      await axios.put(`/api/gameRound/${this.gameId}/${this.round}`, {
        score: roundScore,
      });
      if (this.round++ === 2) {
        await this.endGame();
        return;
      }
      await this.getMaterial();
      this.currentScreen = 1;
    },
    async preparationScreenReady() {
      this.currentScreen = 2;
    },
    async getMaterial() {
      const response = await axios.get(
        `/api/material/${this.gameId}/${this.round}`
      );
      const data = response.data;
      this.fullAnswer = `${data.songAuthor} - ${data.songName}`;
      this.whatToGuess = data.guessingTheme;
      this.correctAnswer = data.correctAnswer;
      this.answers = [];
      this.answers.push(data.correctAnswer);
      this.answers.push(...data.incorrectAnswers);
      this.shuffleArray(this.answers);

      this.songLink = `http://localhost:9091/api/playSong/${encodeURIComponent(
        data.songPath
      )}`;
    },
    shuffleArray(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    },
  },
};
</script>

<style></style>
