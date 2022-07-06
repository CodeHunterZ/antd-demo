<template>
  <div class="page-main page-feedback">
    <!-- 父组件使用 -->
    <!-- <common-header>
      <div slot="title">
        <b>意见反馈</b>
      </div>
      <div slot="content">
        感谢您提供的宝贵意见，我们会及时与您反馈。
      </div>
    </common-header> -->
    <div class="page-list pad-x-20 pad-y-15">
      <a-spin :spinning="spinningLoading">
        <div class="feedback-cont">
          <a-form-model
            ref="feedbackForm"
            :model="feedbackForm"
            layout="horizontal"
            label-align="right"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <!-- <a-form-model-item
              label="反馈类型："
              prop="type"
              :rules="[
                { required: true, message: '请选择反馈类型', trigger: 'change' }
              ]"
            >
              <a-select v-model="feedbackForm.type" class="w-full">
                <template v-for="(item, key) in this.enum.FeedBackEnum">
                  <a-select-option :value="item.value" :key="key">{{
                    item.name
                  }}</a-select-option></template
                >
              </a-select>
            </a-form-model-item> -->
            <a-form-model-item
              label="反馈内容："
              prop="description"
              :rules="[
                { required: true, message: '请输入反馈内容', trigger: 'blur' }
              ]"
            >
              <a-textarea
                placeholder="详细说明反馈内容"
                class="w-full"
                :max-length="300"
                :rows="6"
                v-model="feedbackForm.description"
              />
            </a-form-model-item>
            <a-form-model-item label="图片/视频上传：" prop="attachment">
              <div class="upload-text">
                可上传截图或录屏视频（最多上传10个，单个不超过50M，支持格式：jpeg、jpg、png、mp4、avi、mov）
              </div>
              <div class="avatar-show-cont">
                <template v-if="feedbackForm.attachment.length">
                  <template v-for="(item, index) in feedbackForm.attachment">
                    <div
                      class="avatar-show-list"
                      :key="index"
                      v-if="index < 10"
                    >
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
                  name="files"
                  :show-upload-list="false"
                  :multiple="true"
                  list-type="picture-card"
                  accept="jpeg,jpg,png,mp4,avi,mov"
                  :before-upload="beforeUpload"
                >
                  <div>
                    <a-icon type="plus" />
                    <div>上传</div>
                  </div>
                </a-upload>
              </div>
            </a-form-model-item>
            <a-form-model-item label="联系方式：" prop="mobile">
              <a-input
                placeholder="留下联系方式，我们会及时与您反馈"
                class="w-full"
                :max-length="200"
                v-model="feedbackForm.mobile"
              />
            </a-form-model-item>
            <a-form-model-item label="联系我们：">
              400-181-6989（中国） +1(408)512-2162（美国）
            </a-form-model-item>
            <a-form-item class="submit-btn">
              <a-button
                @click="onSubmit('feedbackForm')"
                class="w-full"
                :loading="loading"
                type="primary"
                >提交</a-button
              >
            </a-form-item>
          </a-form-model>
        </div>
      </a-spin>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img
        alt="example"
        style="width: 100%; max-width: 1000px"
        :src="urlChild"
      />
    </a-modal>
  </div>
</template>

<script>
//import User from "@/services/user";
//import * as Util from "@/utils/util";
//import Api from "@/services/api";
//import { mapState } from "vuex";
import OSS from "ali-oss";
export default {
  name: "instructionDemo",
  data() {
    return {
      feedbackForm: {
        type: "suggest",
        description: "",
        attachment: [],
        url: "",
        mobile: ""
      },
      feedbackFormEmpty: {
        type: "suggest",
        description: "",
        attachment: "",
        url: "",
        mobile: ""
      },
      // 上传
      //upload_url: Util.urlWithToken(Api.BASE_VIDEO_IMAGE_UPLOAD),
      upload_url: "",
      loading: false,
      fileList: [],
      previewVisible: false,
      urlChild: "",
      spinningLoading: false
    };
  },
  computed: {
    //...mapState("site", ["enum"])
  },
  methods: {
    onDel(index) {
      this.fileList.splice(index, 1);
      this.feedbackForm.attachment.splice(index, 1);
    },
    onPreview(item) {
      this.urlChild = item.url;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async beforeUpload(file,resFileList) {
      if (this.fileList.length < 10) {
        this.spinningLoading = true;
        let canUpload = false;
        //let res = Util.validFile(file, "jpeg,jpg,png,mp4,avi,mov", 50);
        let res = "";
        if (res.suffix && res.size) {
          canUpload = true;
        } else if (res.suffix && res.size === false) {
          this.$message.warn("文件不能超过5M");
        } else if (res.suffix === false && res.size) {
          this.$message.warn("上传文件格式错误");
        }
        this.fileList = [...this.fileList, file];
        canUpload=this.fileList.length==resFileList.length;
        if (canUpload) {
          // 上传参数
          //const ossConfig = await User.getUploadOss({ route: "attr" });
          const ossConfig = "";
          let client = new OSS({
            // secure: true, // https
            region: ossConfig.data.regionId,
            accessKeyId: ossConfig.data.Credentials.AccessKeyId,
            accessKeySecret: ossConfig.data.Credentials.AccessKeySecret,
            stsToken: ossConfig.data.Credentials.SecurityToken,
            bucket: ossConfig.data.roleSessionName
          });
          // 上传目录
          let remotePath = ossConfig.data.path;
          let arr = [];

          // this.fileList.forEach(file => {
          //   // 生成文件名后缀
          //   //const name = Util.buildOssPath(file.name);
          //   const name ="";
          //   // 生成完整路径
          //   const url = `${remotePath}${name}`;
          //   // 开始分片上传
          //   client.multipartUpload(url, file).then(res => {
          //     if (res && res.res) {
          //       let file_url = res.res.requestUrls[0];
          //       if (file_url.indexOf("?") > -1) {
          //         file_url = file_url.substring(0, file_url.indexOf("?"));
          //       }
          //       console.log(res);
          //       console.log(file_url);
          //       arr.push({ url: file_url, name: file.name });
          //     } else {
          //       console.log("上传失败");
          //       console.log(res);
          //     }
          //   });
          // });

            // 生成文件名后缀
            //const name = Util.buildOssPath(file.name);
            const name ="";
            // 生成完整路径
            const url = `${remotePath}${name}`;
            // 开始分片上传
            client.multipartUpload(url, file).then(res => {
              if (res && res.res) {
                let file_url = res.res.requestUrls[0];
                if (file_url.indexOf("?") > -1) {
                  file_url = file_url.substring(0, file_url.indexOf("?"));
                }
                console.log(res);
                console.log(file_url);
                arr.push({ url: file_url, name: file.name });
              } else {
                console.log("上传失败");
                console.log(res);
              }
            });

          this.feedbackForm.attachment = arr;
        }
        this.spinningLoading = false;
      } else {
        this.$message.warn("文件不能超过10个");
      }
      return false;
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          // User.feedbackAdd(this.feedbackForm).then(res => {
          //   if (res.status === "succeed") {
          //     this.feedbackForm = this.feedbackFormEmpty;
          //   }
          //   this.loading = false;
          // });
        }
      });
    }
  }
};
</script>

