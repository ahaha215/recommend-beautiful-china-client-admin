<template>
  <div class="root">
    <el-table :data="typeData" style="width: 100%" :border="true">
      <el-table-column label="类型名称" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="300">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.gmtCreate).toLocaleString().split('/').join('-') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改日期" width="300">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.gmtModified).toLocaleString().split('/').join('-') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
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
import {findAll,delType} from "@/api/type"

export default {
  data() {
    return {
      typeData: [],
    };
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData(){
        findAll().then((response) => {
            this.typeData = response.data.typeList
        })
    },
    handleEdit(index, row) {
      this.$router.push("/type/edit/" + row.id);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该轮播图信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delType(row.id).then((response) => {
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
  },
};
</script>

<style scoped>
.el-table {
  margin-left: 8px;
  margin-top: 12px;
}
</style>