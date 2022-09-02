<template>
  <a-upload
    :fileList="fileList"
    name="files"
    :show-upload-list="false"
    :multiple="true"
    accept="jpeg,jpg,png,mp4,avi,mov"
    :before-upload="beforeUpload"
    :customRequest="doImgUpload"
  >
    <a-button> <a-icon type="upload" /> Upload </a-button>
  </a-upload>
</template>
<script>
import * as Util from "@/utils/util";
import OSS from "ali-oss";
export default {
  name: "FileUploadv2",
  data() {
    return {
      fileList: [],
      loading: false,
      // 上传预览
      previewVisible: false,
      urlChild: "",
      // 上传loading
      spinningLoading: false,
      // 上传中的文件
      fileArr: [],
      // 通过验证的文件
      resFileList: [],
    };
  },
  methods: {
    // handleChange(info) {
    //   let fileList = [...info.fileList];

    //   // 1. Limit the number of uploaded files
    //   //    Only to show two recent uploaded files, and old ones will be replaced by the new
    //   fileList = fileList.slice(-2);

    //   // 2. read from response and show file link
    //   fileList = fileList.map((file) => {
    //     if (file.response) {
    //       // Component will show file.url as link
    //       file.url = file.response.url;
    //     }
    //     return file;
    //   });

    //   this.fileList = fileList;
    // },
    beforeUpload(file, resFileList) {
      return new Promise((resolve, reject) => {
        if (file !== resFileList[resFileList.length - 1]) {
          return reject(false);
        }
        this.spinningLoading = true;
        let canUpload = true;
        // resFileList.forEach((tempFile) => {
        //   let res = Util.validFile(tempFile, this.typeList.toString(), 50);
        //   if (!res.suffix) {
        //     this.$message.warn("上传文件格式错误");
        //     this.spinningLoading = false;
        //     canUpload = false;
        //   }
        //   if (!res.size) {
        //     this.$message.warn("请上传50M内的文件");
        //     this.spinningLoading = false;
        //     canUpload = false;
        //   }
        // });
        if (canUpload) {
          // 验证后可以上传的文件
          this.resFileList = resFileList;
          return resolve(true);
        }
        return reject(false);
      });
    },
    doImgUpload() {
      console.log("this.fileList");
      console.log(this.fileList);
      if (this.fileList.length + this.resFileList.length < 11) {
        console.log("doImgUpload");
        this.resFileList.forEach(async (file) => {
          let client = new OSS({
            // secure: true, // https
            region: "oss-cn-qingdao",
            accessKeyId: "STS.NSs7PmFJAjpq38TkpYMYNnLuA",
            accessKeySecret: "5UjHvxWHjP1d7BDqUqucfr3zKPwQLjqchtdqrKPREynm",
            stsToken:
              "CAIS8QF1q6Ft5B2yfSjIr5DGfOrZq5Vg3bKaMR7lj3AMQdZigYneozz2IH5Oe3ZpAOkXs/0ym2FS6foalqFvSpQASlDBdpP2NzHTNlvzDbDasumZsJYm6vT8a0XxZjf/2MjNGZabKPrWZvaqbX3diyZ32sGUXD6+XlujQ/br4NwdGbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8AGyZQhKwlMn0jsksv/ukpzAu0eB1QLAp7VL99irEP+NdNJxOZpzadCx0dFte7DJuCwqsEYQq/gv1fUVpG6a4YDHXAUJ+XecOu/T6cZzIRRldmWV8mHEeT6WGoABRYmjGo/4X+kR3kw7TeXEnXSvUr50iIwM7gP31w8h0dgv9+a/StDz5MjoEwqWCHSPHlPDjWkSzx0P1ELR14tBnsL2DQBwBOKGUYTrJFI6cq84KaYc9mbaa/0ux79nZUII9/NQTI9ixzjHuDwf1htBrCjN8dWa2MJCuVLNygjLQ0A=",
            bucket: "tic-gtms",
          });
          let remotePath = `test/${file.name}`;
          // 生成文件名后缀
          const name = Util.buildOssPath(file.name);
          // 生成完整路径
          const url = `${remotePath}${name}`;
          // 开始分片上传
          client.multipartUpload(url, file).then((res) => {
            if (res && res.res) {
              let file_url = res.res.requestUrls[0];
              if (file_url.indexOf("?") > -1) {
                file_url = file_url.substring(0, file_url.indexOf("?"));
              }
              console.log("res");
              console.log(res);
              this.fileList.push({ url: file_url, name: file.name });
            } else {
              console.log("上传失败");
              console.log(res);
            }
          });
        });
      } else {
        this.$message.warn("文件不能超过10个");
      }
      this.spinningLoading = false;
    },
  },
};
</script>