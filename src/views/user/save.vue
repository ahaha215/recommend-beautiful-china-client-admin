<template>
  <div class="root">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number
          v-model="ruleForm.age"
          controls-position="right"
          @change="handleChange"
          :min="0"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择用户角色">
          <el-option label="普通用户" value="普通用户"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar">
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
          >保存或修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

import { addUser } from '@/api/user'
 
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
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [{ required: true, message: "请选择年龄", trigger: "blur" }],
        role: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
        avatar: [
          { required: true, message: "请上传用户头像", trigger: "change" },
        ],
      },
    };
  },
  methods: {
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
          console.log(">>>>" + this.ruleForm)
          // 用户信息保存
          addUser(this.ruleForm).then(response => {
            this.$router.push("/user/list")
          },
          error => {
            this.$message.error('错了哦，这是一条错误消息');  
          })
          
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

<style>
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