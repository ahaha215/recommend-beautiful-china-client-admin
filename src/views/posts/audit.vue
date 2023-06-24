<template>
  <div class="root">
    <el-form :model="posts" label-width="80px">
      <el-form-item label="微话内容">
        <el-input v-model="posts.content" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-input v-model="posts.audit" disabled></el-input>
      </el-form-item>
      <el-form-item label="点赞人数">
        <el-input v-model="posts.likes" disabled></el-input>
      </el-form-item>
      <el-form-item label="发帖用户">
        <el-input v-model="posts.user.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="formatGmtCreateTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="formatGmtModifiedTime" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAuditPass">通过</el-button>
        <el-button type="danger" @click="handleAuditNoPass">不通过</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findPostsById, auditPosts } from "@/api/posts";

export default {
  data() {
    return {
      posts: {},
      postsAuditDTO: {
        id: "",
        auditStr: "",
      },
    };
  },
  computed: {
    formatGmtCreateTime() {
      return new Date(this.posts.gmtCreate)
        .toLocaleString()
        .split("/")
        .join("-");
    },

    formatGmtModifiedTime() {
      return new Date(this.posts.gmtModified)
        .toLocaleString()
        .split("/")
        .join("-");
    },

    typeStr() {
      let typeStr = "";
      var array = this.posts.typeList;
      for (let index in array) {
        typeStr += array[index].typeName + "  ";
      }

      return typeStr;
    },
  },
  created() {
    this.initPostsData();
  },
  methods: {
    initPostsData() {
      if (this.$route.params || this.$route.params.postsId) {
        findPostsById(this.$route.params.postsId).then((response) => {
          this.posts = response.data.postsVO;
          this.postsAuditDTO.id = response.data.postsVO.id;
        });
      }
    },
    handleAuditPass() {
      this.postsAuditDTO.auditStr = "通过";
      auditPosts(this.postsAuditDTO).then(
        (response) => {
          this.$message({
            type: "success",
            message: "审核成功!",
          });
          this.initPostsData();
        },
        (error) => {
          this.$message({
            type: "error",
            message: "审核失败!",
          });
        }
      );
    },
    handleAuditNoPass() {
      this.postsAuditDTO.auditStr = "不通过";
      auditPosts(this.postsAuditDTO).then((response) => {
        auditPosts(this.postsAuditDTO).then(
          (response) => {
            this.$message({
              type: "success",
              message: "审核成功!",
            });
            this.initPostsData();
          },
          (error) => {
            this.$message({
              type: "error",
              message: "审核失败!",
            });
          }
        );
      });
    },
  },
};
</script>

<style lang="scss">
.root {
  margin-top: 12px;
}

.el-input {
  width: 99% !important;
}

.el-input__inner {
  color: black !important;
}

.icon {
  width: 200px;
  height: 200px;
  border-radius: 4px;
}
</style>