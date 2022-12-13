<template>
  <a-tree-select
    v-model="value"
    style="width: 100%"
    :tree-data="treeData"
    tree-checkable
    :show-checked-strategy="SHOW_PARENT"
    :treeCheckStrictly="false"
    search-placeholder="Please select"
    @select="onSelect"
  />
</template>

<script>
import { TreeSelect } from "ant-design-vue";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_CHILD =TreeSelect.SHOW_CHILD;
const SHOW_ALL =TreeSelect.SHOW_ALL;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
export default {
  name: "TreeSelectDemo5",
  data() {
    return {
      value: [],
      treeData,
      SHOW_PARENT,
      SHOW_CHILD,
      SHOW_ALL
    };
  },
  methods: {
      onSelect(valueNow, node, extra) {
        console.log(...arguments);
        console.log(this.value);
        console.log(valueNow);
        console.log(node);
        console.log(extra);
      //children 末级会显示undefined 可用level加一步判断
    //   if(extra.selectedNodes[0].data.props.level==3){
    //     console.log("children为空")
    //   }else{
    //     console.log(extra.selectedNodes[0].data.props.dataRef.children);
    //   }
    },
  },
};
</script>