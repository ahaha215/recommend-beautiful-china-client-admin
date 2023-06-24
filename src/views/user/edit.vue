<template>
  <div class="root">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          v-model="ruleForm.age"
          controls-position="right"
          @change="handleChange"
          :min="0"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="ruleForm.role" placeholder="请选择用户角色">
          <el-option label="普通用户" value="普通用户"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="String(ruleForm.avatar)" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >选择头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          url="http://localhost:5000/oss/avatar/uploadOssFileAvatar"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

import { findUserById, updateUserInfo } from "@/api/user";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        email: "",
        sex: "",
        age: 18,
        role: "",
        avatar: "",
      },
    };
  },
  created() {
    this.initUserData();
  },
  methods: {
    initUserData() {
      if (this.$route.params || this.$route.params.userId) {
        findUserById(this.$route.params.userId).then((response) => {
          this.ruleForm = response.data.userById;
        });
      }
    },

    handleChange() {},

    // 关闭上传弹框的方法
    close() {
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },

    // 上传成功的方法
    cropSuccess(data) {
      console.log(data);
      this.imagecropperShow = false;
      this.ruleForm.avatar = data.url;
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUserInfo(this.ruleForm).then(
            (response) => {
              this.$message({
                showClose: true,
                message: "用户信息修改成功！",
                type: "success",
              })
              // 跳转到用户列表页面
              this.$router.push("/user/list")
            },
            (error) => {
              this.$message({
              showClose: true,
              message: "用户信息修改失败！",
              type: "error",
              })
            }
          )
  
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>