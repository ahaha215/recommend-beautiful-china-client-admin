<template>
  <div class="root">
    <el-form
      :model="typeForm"
      :rules="rules"
      ref="typeForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="类型名称" prop="typeName">
        <el-input v-model="typeForm.typeName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('typeForm')"
          >添加</el-button
        >
        <el-button @click="resetForm('typeForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addType } from "@/api/type";

export default {
  data() {
    return {
      typeForm: {
        typeName: "",
      },
      rules: {
        typeName: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addType(this.typeForm).then(
            (response) => {
              this.$router.push("/type/list");
              this.$message({
                type: "success",
                message: "添加成功!",
              });
            },
            (error) => {
              this.$message.error("添加失败！");
            }
          );
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.ruleForm {
  margin-top: 12px;
}
</style>