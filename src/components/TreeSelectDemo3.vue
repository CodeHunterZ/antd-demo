<!-- Vue SFC -->
<template>
  <div id="app">
    <treeselect v-model="value" :multiple="true" :options="options" :limit="1" />
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  // register the component
  components: { Treeselect },
  name: "TreeSelectDemo3",
  data() {
    return {
      // define the default value
      value: null,
      // define options
      options: [
        {
          id: "a",
          label: "a",
          children: [
            {
              id: "aa",
              label: "aa",
            },
            {
              id: "ab",
              label: "ab",
            },
          ],
        },
        {
          id: "b",
          label: "b",
          children: null,
        },
        {
          id: "c",
          label: "c",
        },
      ],
    };
  },
  methods: {
    arrayhandle(arr) {
      arr.map((item) => {
        // 对数据进行处理
        item.label = item.title;
        if (item.children && item.children.length) {
          arrayhandle(item.children);
        }
      });
      return arr;
    },
  },
};
</script>
