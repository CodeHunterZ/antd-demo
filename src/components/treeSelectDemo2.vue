<template>
<a-tree-select class="w-300" @select="onSelect" v-model="value" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" tree-default-expand-all>
    <template v-for="item1 in treeData">
      <a-tree-select-node :key="item1.id" :value="item1.id" :title="item1.name+ '（' + item1.talent_num + '）'" :level="item1.level" :children="item1.children">
        <a-tree-select-node v-for="item2 in item1.children" :key="item2.id" :value="item2.id" :title="item2.name+ '（' + item2.talent_num + '）'" :level="item2.level" :children="item2.children">
          <a-tree-select-node v-for="item3 in item2.children" :key="item3.id" :value="item3.id" :title="item3.name+ '（' + item3.talent_num + '）'" :level="item3.level" :children="item3.children">
          </a-tree-select-node>
        </a-tree-select-node>
      </a-tree-select-node>
  </template>
</a-tree-select>

</template>

<script>

  export default {
    name:'treeSelectDemo2',
    data() {
      return {
        value: undefined,
        treeData:[],
      };
    },
    methods: {
      onSelect(value, node, extra) {
        console.log(...arguments);
        console.log(value);
        console.log(node);
        console.log(extra);
        console.log(extra.selectedNodes[0].data.props.level);
      },
    },
    mounted(){
      const jsonData=[{"id":2,"parent_id":1,"name":"分校1","level":2,"talent_num":"3","children":[{"id":4,"parent_id":2,"name":"数学学院","level":3,"talent_num":"3","children":[]},{"id":5,"parent_id":2,"name":"计算机学院1","level":3,"talent_num":"3","children":[]},{"id":6,"parent_id":2,"name":"物理学院","level":3,"talent_num":"3","children":[]},{"id":24,"parent_id":2,"name":"经济管理学院","level":3,"talent_num":"3","children":[]},{"id":26,"parent_id":2,"name":"体育学院","level":3,"talent_num":"3","children":[]},{"id":33,"parent_id":2,"name":"幼儿教育学院","level":3,"talent_num":"3","children":[]}]}];
      this.treeData=jsonData;
    }
  };
</script>