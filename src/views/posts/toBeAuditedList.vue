<template>
  <div class="root">
   <!-- 数据表格 -->
    <el-table :data="postsData" style="width: 98%" :border="true">
      <el-table-column label="发表用户" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.user.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="718">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.audit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点赞人数" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.likes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAudit(scope.$index, scope.row)"
            >审核</el-button
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

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      @current-change="changeCurrentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { pageConditionPostsList, delPosts } from "@/api/posts";

export default {
  data() {
    return {
      postsData: [],

      condition: "待审核",
      current: 1,
      limit: 10,

      hasNext: false,
      hasPrevious: false,
      pages: 0,
      total: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      pageConditionPostsList(this.condition, this.current, this.limit).then(
        (response) => {
          this.postsData = response.data.postsVOList;
          this.total = response.data.total;
          this.pages = response.data.pages;
          this.hasNext = response.data.hasNext;
          this.hasPrevious = response.data.hasPrevious;
        }
      );
    },
    handleAudit(index, row) {

      this.$router.push("/posts/audit/" + row.id);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该微话信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPosts(row.id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changeCurrentPage(val) {
      this.current = val;
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-left: 8px;
  margin-top: 12px;
}
.el-pagination {
  margin-top: 50px;
}
</style>>