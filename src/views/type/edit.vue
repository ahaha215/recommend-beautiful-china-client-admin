<template>
  <div class="root">
    <el-form
      :model="typeForm"
      ref="typeForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="类型名称">
        <el-input v-model="typeForm.typeName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('typeForm')"
          >修改</el-button
        >
        <el-button @click="resetForm('typeForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findTypeById,updateType } from "@/api/type";

export default {
  data() {
    return {
      typeForm: {},
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.$route.params || this.$route.params.typeId) {
        findTypeById(this.$route.params.typeId).then((response) => {
            this.typeForm = response.data.type
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateType(this.typeForm).then(
          (response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.$router.push("/type/list")
          },
          (error) => {
            this.$message.error('修改失败！');  
          })
          
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style scoped>
.ruleForm {
  margin-top: 12px;
}
</style>