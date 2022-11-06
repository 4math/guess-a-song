<template>
  <div class="icon-blocks" style="width: 100%">
    <div v-for="(genre, index) in genres" :key="genre" class="block">
      <div class="image-container">
        <el-image
          style="width: 250px; height: 150px"
          class="rounded-image"
          :src="images[index]"
          alt="Snow"
          @click="startGame(genre)"
        />
        <div class="text-container">{{ genre.toLocaleUpperCase() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import RockImage from "../assets/images/rock.jpg";
import PopImage from "../assets/images/pop.jpg";
import RapImage from "../assets/images/rap.jpg";
import LatvianImage from "../assets/images/latvian.jpg";
import axios from "axios";
export default {
  name: "HomeScreen",
  data() {
    return {
      genres: ["rock", "pop", "latvian", "rap"],
      images: [RockImage, PopImage, LatvianImage, RapImage],
      adjectives: [
        "happy",
        "lazy",
        "cosy",
        "fast",
        "unresponsive",
        "slow",
        "big",
        "huge",
        "fatty",
        "lovely",
        "crazy",
        "super",
        "sweet",
      ],
      nouns: [
        "rocket",
        "panda",
        "cat",
        "dog",
        "tree",
        "car",
        "mouse",
        "goose",
        "elephant",
        "monkey",
        "sparrow",
        "cow",
        "sheep",
        "table",
        "lemon",
      ],
    };
  },
  async created() {
    await this.createUser();
  },
  methods: {
    async createUser() {
      if (localStorage.getItem("username") === null) {
        let message = 400;
        while (message === 400) {
          const username = this.generateRandomName();
          const response = await axios.post("api/createUser", {
            username: username,
          });
          if (response.status === 200) {
            message = 200;
            localStorage.setItem("username", username);
          }
        }
      }
    },
    generateRandomName() {
      return `${
        this.adjectives[Math.floor(Math.random() * this.adjectives.length)]
      }_${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;
    },
    async startGame(genre) {
      const response = await axios.post("api/startGame", {
        username: localStorage.getItem("username"),
        genre: genre,
      });
      console.log(response);
      localStorage.setItem("gameId", response.data.gameId);
      this.$router.push("/play");
    },
  },
};
</script>

<style scoped>
.icon-blocks {
  padding: 300px 0;
  display: inline-block;
  box-sizing: border-box;
}

.block {
  cursor: pointer;
  padding: 30px 0;
  display: inline-block;
  width: 25%;
  box-sizing: border-box;
  vertical-align: middle;
}

.rounded-image {
  border-radius: 50%;
}

.image-container {
  position: relative;
  text-align: center;
  color: white;
}

.text-container {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: xx-large;
  /* background-color: white; */
  color: white;
  font-weight: 1000;
}
</style>
