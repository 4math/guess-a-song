<template>
  <el-table
    :data="tableData"
    style="width: 50%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="number" label="No." width="180" />
    <el-table-column prop="username" label="UserName" width="180" />
    <el-table-column prop="score" label="Score" />
    <el-table-column prop="date" label="Date" />
  </el-table>
</template>

<script>
import axios from "axios";
export default {
  name: "LeaderBoardComponent",
  data() {
    return {
      tableData: [],
    };
  },
  created() {},
  async mounted() {
    const response = await axios.get("api/leaderboard");
    this.tableData = response.data;
  },
  methods: {
    tableRowClassName(row, rowIndex) {
      console.log(row);
      console.log(rowIndex);
      if (rowIndex === 0) {
        console.log("Warning!");
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.el-table {
  margin: auto;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
