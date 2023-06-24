<template>
  <div class="root">
    <el-table :data="bannerData" style="width: 100%" :border="true">
      <el-table-column label="标题" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片地址" width="500">
        <template slot-scope="scope">
          <span>{{ scope.row.imageUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" width="500">
        <template slot-scope="scope">
          <span>{{ scope.row.linkUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findAllBanner, delBanner } from "@/api/banner";

export default {
  data() {
    return {
      bannerData: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      findAllBanner().then((response) => {
        this.bannerData = response.data.bannerList;
      });
    },
    handleEdit(index, row) {
      this.$router.push("/banner/edit/" + row.id)
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该轮播图信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBanner(row.id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initData()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-table {
  margin-left: 8px;
  margin-top: 12px;
}
</style>