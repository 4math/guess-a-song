<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router="true"
    @select="handleSelect"
  >
    <el-menu-item index="0" route="/">Guess a Song</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" route="/leaderboard">Leaderboard</el-menu-item>
    <el-menu-item index="2" disabled class="username">Username</el-menu-item>
  </el-menu>
  <RouterView />
</template>

<script>
// import TodoComponent from "./components/Todo.vue";
export default {
  name: "App",
  components: {},
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu-item__disabled {
  color: red;
}
</style>
