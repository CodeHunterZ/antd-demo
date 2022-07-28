<template>
  <div>
    <div v-for="(item, index) in data" :key="item.id">
      <a-avatar @click="showModal(index, item.name)" :style="getColor(index)">{{
        getFirstName(item.name)
      }}</a-avatar>
      {{ item.name }}
      <!-- 内容 -->
    </div>
    <!-- 分页组件 -->
    <a-pagination
      v-model="pageno"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      :page-size="pagesize"
      @change="handlePageChange"
      @showSizeChange="onShowSizeChange"
      :show-total="(total) => `共 ${total} 条`"
    />
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-avatar :style="modalColor">{{ modalFirstName }}</a-avatar>
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "TestPop",
  data() {
    return {
      total: 0, //定义初始有多少条数据
      pageno: 1, //默认第几页
      pagesize: 8, //一页显示多少条数据
      data: [],
      pageSizeOptions: ["2", "3"],
      //原始数据，一般为后端接口提供
      sourceData: [
        {
          key: "1",
          name: "kJohn Brown",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "yJim Green",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "oJoe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "4",
          name: "qJohn Brown2",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "5",
          name: "aJim Green2",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "6",
          name: "vJoe Blac2",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "7",
          name: "uJohn Brown3",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "8",
          name: "eJim Green3",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "9",
          name: "zJoe Black3",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
      //头像颜色数组
      colorArr: ["red", "green", "blue", "grey"],
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      //弹出框头像颜色
      modalColor: {},
      //弹出框姓名首字母
      modalFirstName: "",
    };
  },
  methods: {
    //查询li标签所需的data数组，包含二维数组转换用于切换一页显示几行数据
    queryData(pageno, pagesize) {
      let len = this.sourceData.length;
      let lineNum =
        len % pagesize === 0 ? len / pagesize : Math.floor(len / pagesize + 1);
      let res = [];
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = this.sourceData.slice(i * pagesize, i * pagesize + pagesize);
        res.push(JSON.parse(JSON.stringify(temp)));
      }
      //console.log(res);
      this.total = len;
      this.data = res[pageno - 1];
      console.log(pageno);
      console.log(this.data);
    },
    handlePageChange(pageno, pagesize) {
      //点击第几页触发的函数
      this.pageno = pageno;
      this.pagesize = pagesize;
      this.queryData(pageno, pagesize);
    },
    onShowSizeChange(current, size) {
      //改变每页显示条目数的函数
      //pagesize 变化的回调
      this.pageno = 1;
      this.pagesize = size;
      this.queryData(1, size);
    },
    //列表头像颜色赋值
    getColor(n) {
      return {
        background: this.colorArr[n % 4],
      };
    },
    //弹出框头像颜色赋值
    getFirstName(val) {
      return val.substr(0, 1);
    },
    //头像点击事件
    showModal(index, name) {
      this.modalColor = { background: this.colorArr[index % 4] };
      this.modalFirstName = name.substr(0, 1);
      this.visible = true;
    },
    //确认回调
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    //取消回调
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
  mounted() {
    this.queryData(this.pageno, this.pagesize);
  },
};
</script>