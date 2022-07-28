<template>
  <vue-particles
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  >
    <a-form-model
      layout="inline"
      :model="formInline"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item>
        <a-input v-model="formInline.user" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="formInline.password"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-checkbox :checked="formInline.checked" @change="onChange">
        记住我
      </a-checkbox>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
        >
          Log in
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </vue-particles>
</template>
<script>
const Base64 = require("js-base64").Base64;
export default {
  name: "testLogin",
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        checked: false,
      },
    };
  },
  mounted() {
    let username = localStorage.getItem("user");
    if (username) {
      this.formInline.user = localStorage.getItem("user");
      this.formInline.password = Base64.decode(
        localStorage.getItem("password")
      ); // base64解密
      this.formInline.checked = true;
    }
  },
  methods: {
    handleSubmit(e) {
      console.log(this.formInline);
      /* ------ 账号密码的存储 ------ */
      if (this.formInline.checked) {
        let password = Base64.encode(this.formInline.password); // base64加密
        localStorage.setItem("user", this.formInline.user);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("user");
      }
      /* ------ http登录请求 ------ */
    },
    onChange(e) {
      this.formInline.checked = e.target.checked;
    },
  },
};
</script>
