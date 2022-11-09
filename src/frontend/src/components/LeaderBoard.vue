<template>
  <el-table
    :data="tableData"
    style="width: 50%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="number" label="No." width="180" />
    <el-table-column prop="username" label="UserName" width="180" />
    <el-table-column prop="score" label="Score" />
    <el-table-column prop="genre" label="Genre" />
    <el-table-column prop="date" label="Date" />
  </el-table>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment-timezone";
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
    this.tableData.forEach(
      (x) =>
        (x.date = moment(x.date)
          .tz("Europe/Riga")
          .format("YYYY-MM-DD HH:mm:ss"))
    );
  },
  methods: {
    tableRowClassName(row) {
      console.log(row);
      if (row.rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    },
  },
};
</script>

<style>
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
