<template>
  <div class="main flex justify-between items-center flex-wrap">
    <div>
      <el-progress type="dashboard" :percentage="percentage" :color="colors">
        {{ currentPlayTime }}
      </el-progress>
    </div>
    <div class="row">
      <el-button round="true" @click="giveAnswer(answers[0])">{{
        answers[0]
      }}</el-button>
      <el-button round="true" @click="giveAnswer(answers[1])">{{
        answers[1]
      }}</el-button>
    </div>
    <div class="row">
      <el-button round="true" @click="giveAnswer(answers[2])">{{
        answers[2]
      }}</el-button>
      <el-button round="true" @click="giveAnswer(answers[3])">{{
        answers[3]
      }}</el-button>
    </div>
    <p>
      <span>{{ userAnswer }}</span>
    </p>
    <p v-if="isRoundEnd"><b>Score: </b>{{ roundScore }}</p>
    <el-button round="true" @click="() => {}" v-if="isRoundEnd"
      >Next round</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GuessingScreen",
  data() {
    return {
      answers: [],
      correctAnswer: "",
      songFragment: null,
      percentage: 0,
      currentPlayTime: 0,
      userAnswer: "",
      roundScore: 1000,
      isRoundEnd: false,
      colors: [
        { color: "#f56c6c", percentage: 100 },
        { color: "#e6a23c", percentage: 80 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 40 },
        { color: "#6f7ad3", percentage: 20 },
      ],
    };
  },
  async mounted() {
    await this.getMaterial();
    this.$el.addEventListener("click", () => {
      this.playSound();
    });
    this.songFragment.addEventListener("timeupdate", this.updateSongTime);
  },
  methods: {
    giveAnswer(answer) {
      this.songFragment.pause();
      if (answer === this.correctAnswer) {
        this.userAnswer = "Answer: A correct one!";
        this.calculateScore(true);
      } else {
        this.userAnswer = `Answer: A wrong one! Correct is ${this.correctAnswer}`;
        this.calculateScore(false);
      }
      this.isRoundEnd = true;
      this.songFragment.removeEventListener("timeupdate", this.updateSongTime);
    },
    calculateScore(isWin) {
      if (isWin) {
        this.roundScore *= 1 - this.percentage / 100;
        this.roundScore = Math.floor(this.roundScore);
        return;
      }
      this.roundScore = 0;
    },
    updateSongTime() {
      this.currentPlayTime = Math.round(
        this.songFragment.duration - this.songFragment.currentTime
      );
      this.percentage = 100 - this.convertToPercentage(this.currentPlayTime);
    },
    convertToPercentage(num) {
      return (num * 100) / 15;
    },
    playSound() {
      this.songFragment.autoplay = true;
      this.songFragment.play();
    },
    async getMaterial() {
      const response = await axios.get(
        "/api/material/e39f96a7-9692-407b-9baf-f3a158de531b/1"
      );
      const data = response.data;
      this.correctAnswer = data.correctAnswer;
      this.answers.push(data.correctAnswer);
      this.answers.push(...data.incorrectAnswers);
      this.shuffleArray(this.answers);

      this.songFragment = new Audio(
        `${axios.defaults.baseURL}api/playSong/${encodeURIComponent(
          data.songPath
        )}`
      );
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

<style scoped>
.el-button {
  width: 100%;
  display: inline-block;
}
.main {
  margin: auto;
  width: 30%;
  height: 30%;
}

.row div {
  width: 50%;
}

.row {
  display: flex;
  padding: 15px 0;
}
</style>
