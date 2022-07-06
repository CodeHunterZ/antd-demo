<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button> <a-icon type="upload" /> Select File </a-button>
    </a-upload>
    <a-button
    type="primary"
    :disabled="fileList.length === 0"
    :loading="uploading"

    style="margin-top: 16px"
    @click="handleUpload"
    >
    {{ uploading ? 'Uploading' : 'Start Upload' }}
  </a-button>
</div>
</template>
<script>
  export default {
    name:'testUploadNow',
    data() {
      return {
        fileList: [],
        uploading: false,
        urlList:"",
      };
    },
    methods: {
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      },
      beforeUpload(file,fileList2) {
        this.fileList = [...this.fileList, file];
        return false;
      },
      handleUpload() {
        const { fileList } = this;
        const formData = new FormData();

        fileList.forEach(file => {
          let random_name = "test/";
          this.ossUtils.ossUpload(random_name, file).then((res) => {
            if (res && res.code) {
              console.log("上传成功")
              console.log(res)
              this.uploading = false;
              this.$message.success('upload successfully.');
            } else {
              console.log("上传失败")
              console.log(res)
              this.uploading = false;
              this.$message.error('upload failed.');
            }
          });
        });
        this.uploading = true;

      },
    },
  };

</script>

