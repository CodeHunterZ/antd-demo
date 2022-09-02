<template>
  <a-tree-select
    v-model="value"
    style="width: 100%"
    :tree-data="treeData"
    tree-checkable
    :show-checked-strategy="SHOW_PARENT"
    multiple
    search-placeholder="Please
  select"
    @search="expandSearchKey"
    :treeExpandedKeys="treeExpandedKeys"

  />
</template>
    
<script>
//   :filterTreeNode="findKeyItem"
//:treeExpandedKeys="treeExpandedKeys"
//
import { TreeSelect } from "ant-design-vue";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [
  {
    title: "水果",
    value: "水果",
    key: "水果",
    children: [
      {
        title: "苹果",
        value: "苹果",
        key: "苹果",
      },
      {
        title: "桃子",
        value: "桃子",
        key: "桃子",
      },
    ],
  },
  {
    title: "蔬菜",
    value: "蔬菜",
    key: "蔬菜",
    children: [
      {
        title: "白菜",
        value: "白菜",
        key: "白菜",
      },
      {
        title: "油菜",
        value: "油菜",
        key: "油菜",
      },
      {
        title: "花菜",
        value: "花菜",
        key: "花菜",
      },
    ],
  },
];
export default {
  name: "TreeSelect",
  data() {
    return {
      value: [],
      treeData,
      SHOW_PARENT,
      treeExpandedKeys: [],
      findKeys: [],
      tempNum: 0,
      searchValue: "",
      tempSearchValue: "",
    };
  },
  methods: {
    expandSearchKey(tempKey) {
      console.log(tempKey);
      this.tempSearchValue = tempKey;
      this.treeExpandedKeys = ["蔬菜"];
    },
    findKeyItem(inputValue, treeNode) {
      let flag = false;
      console.log(inputValue);
      console.log(treeNode);
      this.tempNum++;
      console.log(this.tempNum);

      if (treeNode.data.props.value.indexOf(inputValue) > -1) {
        this.findKeys.push(treeNode.data.props.key);
        flag = true;
      }
      if (this.tempNum == treeData.length) {
        this.treeExpandedKeys = this.findKeys;
      }
      return flag;
    },
    selectNode(value, node, extra) {
      console.log(value);
      console.log(node);
      console.log(extra);
      this.searchValue = this.tempSearchValue;
    },
  },
};
</script>

