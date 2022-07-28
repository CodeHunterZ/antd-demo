<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :showHeader="false"
  >
    <span slot="allData" slot-scope="item">
        姓名：{{ item.name }}
        <a-divider type="vertical" />
        年龄：{{ item.age }}
        <a-divider type="vertical" />
        地址：{{ item.address }}
        <a-divider type="vertical" />
        <a-tag
          v-for="tag in item.tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "allData",
    key: "allData",
    scopedSlots: { customRender: "allData" },
  },
];

const data = [];

export default {
  name: "TestTablePage",
  data() {
    return {
      data,
      columns,
      sourceData: [
        {
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
        {
          name: "ki ki",
          age: 32,
          address: "test ki ki",
          tags: ["nice", "developer"],
        },
        {
          name: "dark",
          age: 42,
          address: "test Dark",
          tags: ["loser"],
        },
        {
          name: "light",
          age: 32,
          address: "testLight",
          tags: ["cool", "teacher"],
        },
      ],
      pagination: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 2, // 默认当前页显示数据的大小
        showSizeChanger: true,
        pageSizeOptions: ["2", "3"],
        //showTotal: (total) => `Total ${total} items`, // 显示总数
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
        },
        hideOnSinglePage: true,
      },
    };
  },
  methods: {
    //baseArray 原始数组
    // n 一组的元素数量 默认10
    // transArray(baseArray, n = 10) {
    //   let len = baseArray.length;
    //   let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
    //   let res = [];
    //   for (let i = 0; i < lineNum; i++) {
    //     // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
    //     let temp = baseArray.slice(i * n, i * n + n);
    //     res.push(JSON.parse(JSON.stringify(temp)));
    //   }
    //   //console.log(res);
    //   return res;
    // },
    addKey() {
      if (this.sourceData) {
        let i = 1;
        this.sourceData.forEach((r) => {
          this.data.push(Object.assign({ key: i++ }, r));
        });
        console.log(this.data);
      }
    },
  },
  mounted() {
    this.addKey();
  },
};
</script>
