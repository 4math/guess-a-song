<template>
  <div class="main">
    <p>
      <span>
        Round: <b>{{ round }}/8</b></span
      >
    </p>
    <p>
      <span
        >Music genre: <b>{{ genre.toUpperCase() }}</b></span
      >
    </p>
    <p>
      <span
        >Guessing: <b>{{ whatGuessing() }}</b></span
      >
    </p>
    <p>
      <span class="emoji">{{ getGenreEmoji() }}</span>
    </p>
    <span>Timer: {{ countDown }}</span>
  </div>
</template>

<script>
export default {
  name: "PreparationScreen",
  props: ["round", "genre", "whatToGuess"],
  data() {
    return {
      countDown: 4,
    };
  },
  created() {
    this.countDown = 4;
    this.countDownTimer();
  },
  methods: {
    getGenreEmoji() {
      if (this.genre === "rock") {
        return `🎸`;
      } else if (this.genre === "pop") {
        return `🎤`;
      } else if (this.genre === "rap") {
        return `🚀`;
      } else if (this.genre === "latvian") {
        return `🌼`;
      }
    },
    whatGuessing() {
      if (this.whatToGuess === "bandName") {
        return "Band Name";
      } else if (this.whatToGuess === "songName") {
        return "Song Name";
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.$emit("done-counting", true);
      }
    },
  },
};
</script>

<style scoped>
.main {
  font-size: 40px;
  height: 50%;
  width: 50%;
  margin: auto;
}

.emoji {
  font-size: 90px;
  text-align: center;
}
</style>
