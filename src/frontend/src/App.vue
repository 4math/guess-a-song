<template>
  <div :style="inlineStyle">
    <NavBar v-if="notGameScreen" />
    <RouterView />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: { NavBar },
  data() {
    return {};
  },
  computed: {
    notGameScreen() {
      if (this.$route.path == "/play") {
        return false;
      }
      return true;
    },
    bgImage() {
      return new URL("./assets/images/background8.webp", import.meta.url).href;
    },
    inlineStyle() {
      return {
        backgroundImage: `url(${this.bgImage})`,
        height: "880px",
      };
    },
  },
  methods: {},
};
</script>

<style scoped></style>
