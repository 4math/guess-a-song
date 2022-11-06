<template>
  <NavBar v-if="notGameScreen" />
  <RouterView />
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
  },
  methods: {},
};
</script>

<style scoped></style>
