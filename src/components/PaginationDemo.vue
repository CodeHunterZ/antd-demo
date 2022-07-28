<template>
  <div>
    <div v-for="item in data" :key="item.id">
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
  </div>
</template>
<script>
export default {
  name: "PaginationDemo",
  data() {
    return {
      total: 0, //定义初始有多少条数据
      pageno: 1, //默认第几页
      pagesize: 3, //一页显示多少条数据
      data: [],
      pageSizeOptions: ["2", "3"],
      sourceData: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "4",
          name: "John Brown2",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "5",
          name: "Jim Green2",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "6",
          name: "Joe Blac2",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          key: "7",
          name: "John Brown3",
          age: 32,
          address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "8",
          name: "Jim Green3",
          age: 42,
          address: "London No. 2 Lake Park, London No. 2 Lake Park",
          tags: ["loser"],
        },
        {
          key: "9",
          name: "Joe Black3",
          age: 32,
          address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
    };
  },
  methods: {
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
      this.queryData(1,size); 
    },
  },
  mounted() {
    this.queryData(this.pageno, this.pagesize);
  },
};
</script>