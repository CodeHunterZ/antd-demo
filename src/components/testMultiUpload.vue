<template>
  <div class="clearfix">
    <a-upload
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <a-button> <a-icon type="upload" /> Select File </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? "Uploading" : "Start Upload" }}
    </a-button>
  </div>
</template>
<script>
export default {
  name: "testUpload",
  data() {
    return {
      fileList: [],
      uploading: false,
      urlList: "",
    };
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      const progress = (p, _checkpoint) => {
        // Object的上传进度。
        console.log(p);
        // 分片上传的断点信息。
        console.log(_checkpoint);
      };
      fileList.forEach((file) => {
        let random_name = "test/";
        const progress = (p, _checkpoint) => {
          // Object的上传进度。
          console.log(p);
          // 分片上传的断点信息。
          console.log(_checkpoint);
        };
        this.ossUtils.ossMultipartUpload(random_name, file,progress).then((res) => {
          if (res && res.statusCode) {
            console.log("上传成功");
            console.log(res);
            this.uploading = false;
            this.$message.success("upload successfully.");
          } else {
            console.log("上传失败");
            console.log(res);
            this.uploading = false;
            this.$message.error("upload failed.");
          }
        });
      });
      this.uploading = true;
    },
  },
};
</script>

