<template>
  <div id="testDiv" @click="divClike">
    <a-select
      show-search
      style="width: 150px"
      :filter-option="filterOption"
      :open="selectOpen"
      @select="selectOpen = false"
      @blur="blurEvent"
      option-label-prop="label"
    >
      <div slot="dropdownRender" slot-scope="menu">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0" />
        <div style="padding: 4px 18px; cursor: pointer">
          <a-icon
            @click="addItem"
            @mousedown="(e) => e.preventDefault()"
            type="plus"
          />
          <a-input
            id="inputAdd"
            placeholder="新增项"
            v-model="itemStr"
            @blur="blurEvent"
          >
          </a-input>
        </div>
      </div>
      <a-select-option
        v-for="item in selectItems"
        :key="item"
        :value="item"
        :label="item"
      >
        {{ item }}
        <a-icon
          style="position: absolute; top: 30%; right: 10%"
          type="delete"
          @click.stop="deleteItem(item)"
        />
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
let index = 0;
export default {
  name: "testSelectAddDemo2",
  data() {
    return {
      selectItems: ["jack", "lucy"],
      itemStr: "",
      selectOpen: false,
    };
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  methods: {
    addItem() {
      if (!this.itemStr) {
        this.$message.error("新增项为空");
        return;
      }
      if (!this.selectItems.includes(this.itemStr)) {
        this.selectItems.push(this.itemStr);
        this.itemStr = "";
        this.$message.success("创建成功");
      } else {
        this.$message.error("存在相同选项");
      }
    },
    blurEvent(e) {
      let f = "inputSearch";
      //获取当前焦点 id
      if (document.activeElement.id != "inputAdd") {
        this.selectOpen = false;
      }
    },
    divClike(e) {
      //e.preventDefault();
      console.log(e);
      console.log(this.selectOpen);
      this.selectOpen = !this.selectOpen;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    /**
     * 删除分组选项
     */
    deleteItem(label) {
      const index = this.selectItems.indexOf(label);
      this.selectItems.splice(index, 1);
    },
  },
};
</script>