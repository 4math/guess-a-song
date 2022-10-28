<template>
  <TodoComponent />
</template>

<script>
import TodoComponent from "./components/Todo.vue";
export default {
  name: "App",
  components: {
    TodoComponent,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
