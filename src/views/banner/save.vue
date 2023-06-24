<template>
  <div class="root">
    <el-form
      :model="bannerForm"
      :rules="rules"
      ref="bannerForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="bannerForm.title"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input v-model="bannerForm.linkUrl"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" prop="imageUrl">
        <el-upload
          class="upload-demo"
          action="http://localhost:5000/oss/banner/uploadOssFileBanner"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请选择一张图片</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('bannerForm')"
          >添加</el-button
        >
        <el-button @click="resetForm('bannerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {delBannerImage,addBanner} from "@/api/banner"

export default {
  data() {
    return {
      bannerForm: {
        title: "",
        imageUrl: "",
        linkUrl: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        linkUrl: [
          { required: true, message: "请输入链接地址", trigger: "blur" },
        ],
        imageUrl: [
          { required: true, message: "请上传图片", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleSuccess(file){
      this.bannerForm.imageUrl = file.data.url
    },
    handleRemove(file) {
      var str = file.response.data.url
      var splitStr = str.split("/");
      delBannerImage(splitStr[splitStr.length - 1]).then((response) => {
        this.bannerForm.imageUrl = "";
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBanner(this.bannerForm).then(
          (response) => {
            this.$router.push("/banner/list")
            this.$message({
              type: "success",
              message: "上传成功!",
            });
          },
          (error) => {
            this.$message.error('上传失败！');  
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

<style scoped>
.ruleForm {
  margin-top: 12px;
}
</style>