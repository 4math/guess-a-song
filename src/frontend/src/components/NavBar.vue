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
    <el-menu-item index="2" disabled class="username">{{
      username
    }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      activeIndex: "0",
      username: "",
    };
  },
  mounted() {
    if (localStorage.username) {
      this.username = localStorage.username;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.el-menu-item__disabled {
  color: red;
}
</style>
