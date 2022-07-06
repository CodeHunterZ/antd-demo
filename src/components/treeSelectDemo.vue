<template>
  <a-tree-select
  v-model="value"
  style="width: 100%"
  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
  :tree-data="treeData"
  placeholder="Please select"
  tree-default-expand-all
  :replaceFields="replaceFields"
  @select="onSelect"
  >
</a-tree-select>
</template>

<script>

  export default {
    name:'treeSelectDemo',
    data() {
      return {
        value: undefined,
        treeData:[],
        replaceFields:{children:'children', title:'name', key:'id', value: 'id' },
      };
    },
    methods: {
      onSelect(value, node, extra) {
        console.log(...arguments);
        console.log(value);
        console.log(node);
        console.log(extra);
      //children 末级会显示undefined 可用level加一步判断
      if(extra.selectedNodes[0].data.props.level==3){
        console.log("children为空")
      }else{
        console.log(extra.selectedNodes[0].data.props.dataRef.children);
      }
    },
  },
  mounted(){
    //原始json
    const jsonData=[{"id":1,"parent_id":0,"name":"青岛大学","level":1,"talent_num":"6","children":[{"id":2,"parent_id":1,"name":"分校1","level":2,"talent_num":"5","children":[{"id":4,"parent_id":2,"name":"数学学院","level":3,"talent_num":"5"},{"id":5,"parent_id":2,"name":"计算机学院","level":3,"talent_num":"5"},{"id":6,"parent_id":2,"name":"物理学院","level":3,"talent_num":"5"},{"id":24,"parent_id":2,"name":"经济管理学院","level":3,"talent_num":"5"},{"id":26,"parent_id":2,"name":"体育学院","level":3,"talent_num":"5"},{"id":33,"parent_id":2,"name":"幼儿教育学院","level":3,"talent_num":"5"}]},{"id":3,"parent_id":1,"name":"分校2","level":2,"talent_num":"5","children":[{"id":20,"parent_id":3,"name":"文理学院","level":3,"talent_num":"6"},{"id":21,"parent_id":3,"name":"外语学院","level":3,"talent_num":"5"},{"id":45,"parent_id":3,"name":"1111","level":3,"talent_num":"5"},{"id":46,"parent_id":3,"name":"5","level":3,"talent_num":"5"}]},{"id":7,"parent_id":1,"name":"分校3","level":2,"talent_num":"5","children":[]},{"id":8,"parent_id":1,"name":"分校4","level":2,"talent_num":"5","children":[]},{"id":9,"parent_id":1,"name":"分校3","level":2,"talent_num":"6","children":[]},{"id":14,"parent_id":1,"name":"分校4","level":2,"talent_num":"5","children":[]},{"id":18,"parent_id":1,"name":"分校5","level":2,"talent_num":"5","children":[]},{"id":19,"parent_id":1,"name":"分校6","level":2,"talent_num":"5","children":[]},{"id":22,"parent_id":1,"name":"音乐学院","level":2,"talent_num":"5","children":[]},{"id":25,"parent_id":1,"name":"学院2","level":2,"talent_num":"5","children":[]},{"id":27,"parent_id":1,"name":"中文学院","level":2,"talent_num":"5","children":[]},{"id":28,"parent_id":1,"name":"考古学院","level":2,"talent_num":"5","children":[]},{"id":29,"parent_id":1,"name":"经济管理学院","level":2,"talent_num":"5","children":[]}]}];
    //递归修改name
    const mapTree = tempNode => {
      const haveChildren = Array.isArray(tempNode.children) && tempNode.children.length > 0;
      return {
       id : tempNode.id,
       parent_id: tempNode.parent_id,
       name: tempNode.name+'（' + tempNode.talent_num + '）',
       level: tempNode.level,
       talent_num: tempNode.talent_num,
       children:haveChildren ? tempNode.children.map(i => mapTree(i)) : [],
     }
   };
   this.treeData= jsonData.map(tempNode => mapTree(tempNode) )
   console.log(this.treeData)
 }
};
</script>