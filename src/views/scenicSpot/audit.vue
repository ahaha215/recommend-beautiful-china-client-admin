<template>
  <div class="root">
    <el-form :model="scenicSpot" label-width="80px">
      <el-form-item label="景点名称">
        <el-input v-model="scenicSpot.scenicSpotName" disabled></el-input>
      </el-form-item>
      <el-form-item label="景点描述">
        <el-input v-model="scenicSpot.description" disabled></el-input>
      </el-form-item>
      <el-form-item label="所在地区">
        <el-input v-model="scenicSpot.region" disabled></el-input>
      </el-form-item>
      <el-form-item label="所在地址">
        <el-input v-model="scenicSpot.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="详情介绍">
        <el-input v-model="scenicSpot.detail" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-input v-model="scenicSpot.audit" disabled></el-input>
      </el-form-item>
      <el-form-item label="查看人数">
        <el-input v-model="scenicSpot.viewSum" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属类型">
        <el-input :value="typeStr" disabled></el-input>
      </el-form-item>
      <el-form-item label="推荐用户">
        <el-input v-model="scenicSpot.user.ç" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="formatGmtCreateTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="formatGmtModifiedTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="景点图标">
        <img class="icon" :src="scenicSpot.icon" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAuditPass">通过</el-button>
        <el-button type="danger" @click="handleAuditNoPass">不通过</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findScenicSpotById, auditScenicSpot } from "@/api/scenicSpot";

export default {
  data() {
    return {
      scenicSpot: {},
      scenicSpotAuditDTO: {
        id: "",
        auditStr: "",
      },
    };
  },
  computed: {
    formatGmtCreateTime() {
      return new Date(this.scenicSpot.gmtCreate)
        .toLocaleString()
        .split("/")
        .join("-");
    },

    formatGmtModifiedTime() {
      return new Date(this.scenicSpot.gmtModified)
        .toLocaleString()
        .split("/")
        .join("-");
    },

    typeStr() {
      let typeStr = "";
      var array = this.scenicSpot.typeList;
      for (let index in array) {
        typeStr += array[index].typeName + "  ";
      }

      return typeStr;
    },
  },
  created() {
    this.initScenicSpotData();
  },
  methods: {
    initScenicSpotData() {
      if (this.$route.params || this.$route.params.scenicSpotId) {
        findScenicSpotById(this.$route.params.scenicSpotId).then((response) => {
          this.scenicSpot = response.data.scenicSpotVO;
          this.scenicSpotAuditDTO.id = response.data.scenicSpotVO.id;
        });
      }
    },
    handleAuditPass() {
      this.scenicSpotAuditDTO.auditStr = "通过";
      auditScenicSpot(this.scenicSpotAuditDTO).then(
        (response) => {
          this.$message({
            type: "success",
            message: "审核成功!",
          });
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
      this.scenicSpotAuditDTO.auditStr = "不通过";
      auditScenicSpot(this.scenicSpotAuditDTO).then(
        (response) => {
          this.$message({
            type: "success",
            message: "审核成功!",
          });
        },
        (error) => {
          this.$message({
            type: "error",
            message: "审核失败!",
          });
        }
      );
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