<template>
  <div>
    <a-textarea v-model="info" placeholder="Basic usage" :rows="4" /><a-button
      @click="handleCheck"
      type="primary"
    >
      Primary
    </a-button>
  </div>
</template>

<script>
export default {
  name: "TestEmail",
  data() {
    return {
      info: "",
    };
  },
  methods: {
    handleCheck() {
      let eArr = this.info.split("\n");
      let flag=true;
      eArr.forEach((item) => {
        let fomatterE = item.trimStart().trimEnd();
        let index = fomatterE.indexOf(" ");
        let email = fomatterE.substring(0, index);
        let name = fomatterE.substring(index, fomatterE.length);
        if (!this.checkEmail(email)) {
          console.log(email + "校验失败：格式有误");
          flag=false;
          return;
        }
      });
      if(flag){
        console.log("校验成功");
      }
    },
    checkEmail(e) {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return reg.test(e);
    },
  },
};
</script>