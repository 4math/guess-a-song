<template>
  <PreparationScreen
    :round="round"
    :genre="genre"
    :what-to-guess="whatToGuess"
    @done-counting="preparationScreenReady"
    v-if="currentScreen === 1"
  />
  <GuessingScreen v-if="currentScreen === 2" />
</template>

<script>
import PreparationScreen from "./PreparationScreen.vue";
import GuessingScreen from "./GuessingScreen.vue";
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
      genre: "Latvian",
      whatToGuess: "bandName",
    };
  },
  methods: {
    preparationScreenReady() {
      this.currentScreen = 2;
    },
  },
};
</script>

<style></style>
