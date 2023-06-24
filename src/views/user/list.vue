<template>
  <div class="root">
    <!-- 数据表格 -->
    <el-table :data="userData" style="width: 98%" :border=true>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.points }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
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
import { pageUserList } from "@/api/user";
import { delUser } from "@/api/user";

export default {
  data() {
    return {
      userData: [],

      current: 1,
      limit: 10,

      hasNext: false,
      hasPrevious: false,
      pages: 0,
      total: 0,
    };
  },
  created() {
    this.initUserData();
  },
  methods: {
    initUserData() {
      pageUserList(this.current, this.limit).then((response) => {
        this.userData = response.data.userList;
        this.total = response.data.total;
        this.pages = response.data.pages;
        this.hasNext = response.data.hasNext;
        this.hasPrevious = response.data.hasPrevious;
      });
    },
    handleEdit(index, row) {
      this.$router.push("/user/edit/" + row.id)
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(row.id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initUserData()
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
      this.initUserData();
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