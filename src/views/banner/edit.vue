<template>
  <div class="root">
    <el-form
      ref="bannerForm"
      :model="bannerForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="标题">
        <el-input v-model="bannerForm.title" />
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="bannerForm.linkUrl" />
      </el-form-item>
      <el-form-item label="图片地址">
        <el-upload
          class="upload-demo"
          action="http://localhost:5000/oss/banner/uploadOssFileBanner"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请选择一张图片</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('bannerForm')"
        >修改</el-button>
        <el-button @click="resetForm('bannerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { delBannerImage, findBannerById, updateBanner } from '@/api/banner'

export default {
  data() {
    return {
      fileList: [],
      bannerForm: {
        title: '',
        imageUrl: '',
        linkUrl: ''
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleSuccess(file) {
      this.bannerForm.imageUrl = file.data.url
    },
    handleRemove() {
      const file = this.fileList[0]
      var str = file.url
      var splitStr = str.split('/')
      delBannerImage(splitStr[splitStr.length - 1]).then((response) => {
        this.bannerForm.imageUrl = ''
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateBanner(this.bannerForm).then(
            (response) => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.$router.push('/banner/list')
            },
            (error) => {
              this.$message.error('修改失败！')
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    initData() {
      if (this.$route.params || this.$route.params.bannerId) {
        findBannerById(this.$route.params.bannerId).then((response) => {
          this.bannerForm = response.data.banner

          // 初始化图片
          const str = response.data.banner.imageUrl
          const spitStr = str.split('/')
          const fileName = spitStr[spitStr.length - 1]

          const file = {
            name: fileName,
            url: str
          }
          this.fileList.push(file)
        })
      }
    }
  }
}
</script>

<style scoped>
.ruleForm {
  margin-top: 12px;
}
</style>
