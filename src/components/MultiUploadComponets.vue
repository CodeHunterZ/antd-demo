<template>
  <div>
    <div class="upload-text">
      可上传截图或录屏视频（最多上传10个，单个不超过50M，支持格式：jpeg、jpg、png、mp4、avi、mov）
    </div>
    <div class="avatar-show-cont">
      <template v-if="fileArr.length">
        <template v-for="(item, index) in fileArr">
          <div class="avatar-show-list" :key="index" v-if="index < 10">
            <div class="show-item-wrap">
              <div
                class="show-item bg-cover"
                :style="{ backgroundImage: 'url(' + item.url + ')' }"
              >
                <div class="img-option-wrap">
                  <div class="img-option">
                    <div class="img-icon-priview">
                      <a-icon @click="onPreview(item)" type="eye" />
                    </div>
                    <div class="img-icon-del">
                      <a-icon @click="onDel(index)" type="delete" />
                    </div>
                  </div>
                </div>
              </div>
            </div></div></template
      ></template>
      <a-upload
        :fileList="fileList"
        name="files"
        :show-upload-list="false"
        :multiple="true"
        list-type="picture-card"
        accept="jpeg,jpg,png,mp4,avi,mov"
        :before-upload="beforeUpload"
        :customRequest="doImgUpload"
      >
        <div>
          <a-icon type="plus" />
          <div>上传</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img
        alt="example"
        style="width: 100%; max-width: 1000px"
        :src="urlChild"
      />
    </a-modal>
    </div>
  </div>
</template>
<script>
import * as Util from "@/utils/util";
import OSS from "ali-oss";
export default {
  name: "MultiUploadComponets",
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
      resFileList: []
    };
  },
  methods: {
    beforeUpload(file, resFileList) {
      return new Promise((resolve, reject) => {
        if (file !== resFileList[resFileList.length - 1]) {
          return reject(false);
        }
        this.spinningLoading = true;
        let canUpload = true;
        resFileList.forEach((tempFile) => {
          let res = Util.validFile(tempFile, "jpeg,jpg,png,mp4,avi,mov", 50);
          debugger;
          if (!res.suffix) {
            this.$message.warn("上传文件格式错误");
            canUpload = false;
            this.spinningLoading = false;
          }
          if (!res.size) {
            this.$message.warn("文件不能为空或超过50M");
            canUpload = false;
            this.spinningLoading = false;
          }
        });
        if (canUpload) {
          // 验证后可以上传的文件
          this.resFileList = resFileList;
          return resolve(true);
        }
        return reject(false);
      });
    },
    doImgUpload() {

      // console.log(this.fileList);
      // if (this.fileList.length + this.resFileList.length < 11) {
      //   console.log("doImgUpload");
      //   this.resFileList.forEach(async (file) => {
      //     //上传oss配置参数
      //     //   const ossConfig = await User.getUploadOss({ route: "attr" });
      //     //   let client = new OSS({
      //     //     // secure: true, // https
      //     //     region: ossConfig.data.regionId,
      //     //     accessKeyId: ossConfig.data.Credentials.AccessKeyId,
      //     //     accessKeySecret: ossConfig.data.Credentials.AccessKeySecret,
      //     //     stsToken: ossConfig.data.Credentials.SecurityToken,
      //     //     bucket: ossConfig.data.roleSessionName,
      //     //   });
      //     // //上传目录
      //     //let remotePath = ossConfig.data.path;
      //     let client = new OSS({
      //       // secure: true, // https
      //       region: "oss-cn-qingdao",
      //       accessKeyId: "STS.NTRQ7gBZVVH61x241GVPrgQTF",
      //       accessKeySecret: "G4kygG2UKRHrrXixJRgSHNo81zRq9AtaVZxdveR7qMbc",
      //       stsToken:
      //         "CAIS9QF1q6Ft5B2yfSjIr5fnGo3Tr4V34YrdM16D0DESWt9eiJT/pDz2IH5Oe3ZpAOkXs/0ym2FS6foalqVcZKZ5TEjJa9dc44oPTrVb63yZ6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsv/nmZbHu0qP0AynlbZKnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwo1vMboG6e74zEXgYAuUraa/C26NRqKxRieqUhB76JAxEzFSi+0BqAAT4UF/SrRNgG8iLlNtRNgC936r/YL3uhDCcl6iZCLFxe8PBJZ+xNkypl8eQLW3c5/JJRQhqgzy3rfd5zUOKTR+5T+/bmAgATXtjTkmvewYdveWJrMXydOSGV/667Gp6R8SFGq7bREkGuVbv2wl6Azr4+DLqATwCBxLYA0RgVrojf",
      //       bucket: "tic-gtms",
      //     });
      //     let remotePath = `test/${file.name}`;
      //     // 生成文件名后缀
      //     const name = Util.buildOssPath(file.name);
      //     // 生成完整路径
      //     const url = `${remotePath}${name}`;
      //     // 开始分片上传
      //     client.multipartUpload(url, file).then((res) => {
      //       if (res && res.res) {
      //         let file_url = res.res.requestUrls[0];
      //         if (file_url.indexOf("?") > -1) {
      //           file_url = file_url.substring(0, file_url.indexOf("?"));
      //         }
      //         this.fileArr.push({ url: file_url, name: file.name });
      //       } else {
      //         console.log("上传失败");
      //         console.log(res);
      //       }
      //     });
      //   });
      // } else {
      //   this.$message.warn("文件不能超过10个");
      // }
      // this.spinningLoading = false;
    },
    onDel(index) {
      this.resFileList.splice(index, 1);
      this.feedbackForm.attachment.splice(index, 1);
    },
    onPreview(item) {
      var type = ["mp4", "avi", "mov"];
      let suffixArr = item.name.split(".");
      if (type.indexOf(suffixArr[suffixArr.length - 1]) > -1) {
        this.$message.warn("视频无法预览");
      } else {
        this.urlChild = item.url;
        this.previewVisible = true;
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>
