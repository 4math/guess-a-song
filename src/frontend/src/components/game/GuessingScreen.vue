<template>
  <div class="main flex justify-between items-center flex-wrap">
    <div class="module center">
      <div class="progress">
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
      <p v-if="isRoundEnd"><b>Full song name: </b>{{ fullAnswer }}</p>
      <el-button round="true" @click="nextRound" v-if="isRoundEnd"
        >Next round</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "GuessingScreen",
  props: ["answers", "correctAnswer", "songLink", "fullAnswer"],
  data() {
    return {
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
  async created() {
    console.log(this.songLink);
    this.songFragment = new Audio(this.songLink);
    this.songFragment.crossOrigin = "anonymous";
    this.songFragment.addEventListener("timeupdate", this.updateSongTime);
  },
  async mounted() {
    await this.playSound();
  },
  methods: {
    async nextRound() {
      await this.playSound();
      this.songFragment.src = null;
      this.songFragment.currentTime = 0;
      this.$emit("done-guessing", this.roundScore);
    },
    giveAnswer(answer) {
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
        this.roundScore *=
          (this.songFragment.duration - this.songFragment.currentTime) /
            this.songFragment.duration +
          0.05;
        this.roundScore = Math.floor(this.roundScore);
        if (!isNaN(this.roundScore)) {
          this.roundScore = Math.min(this.roundScore, 1000);
        } else {
          this.roundScore = 1000;
        }
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
    async playSound() {
      this.songFragment.autoplay = true;
      await this.songFragment.play();
    },
  },
  watch: {
    percentage(newValue) {
      if (newValue === 100) {
        this.isRoundEnd = true;
        this.songFragment.removeEventListener(
          "timeupdate",
          this.updateSongTime
        );
        this.calculateScore(false);
      }
    },
  },
};
</script>

<style scoped>
.progress {
  margin: auto;
  left: 38%;
  position: relative;
}

.el-button {
  width: 100%;
  display: inline-block;
}
.main {
  width: 100%;
  height: 500px;
}

.main > div {
  padding: 1rem;
}

.center {
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

.module {
  margin: auto;
  width: 50%;
  height: 300px;
}

.row div {
  width: 50%;
}

.row {
  display: flex;
  padding: 15px 0;
}
</style>
