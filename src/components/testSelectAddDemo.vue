<template>
  <div>
    <a-select
      show-search
      style="width: 150px"
      :filter-option="filterOption"
      v-model="group"
      placeholder="请选择分组"
      option-label-prop="label"
    >
      <div slot="dropdownRender" slot-scope="menu">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0" />
        <div
          style="padding: 4px 8px; cursor: pointer"
          @mousedown="(e) => e.preventDefault()"
          @click="addItemShow"
        >
          <a-icon type="plus" /> 新增分组
        </div>
      </div>
      <a-select-option
        class="delete-icon"
        :value="item"
        v-for="item in groupList"
        :key="item"
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
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>分组名称</p>
      <a-input v-model="newItem" placeholder="请输入分组名称，注意保持唯一" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "testSelectAddDemo",
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      groupList: ["未分组", "分组1", "分组2"],
      group: "",
      newItem: "",
      visible: false,
    };
  },

  methods: {
    /**
     * 删除分组选项
     */
    deleteItem(label) {
      const index = this.groupList.indexOf(label);
      this.groupList.splice(index, 1);
    },
    /**
     * 打开分组弹窗
     */
    addItemShow() {
      this.visible = true;
    },
    /**
     * 关闭分组弹窗
     */
    handleCancel() {
      this.visible = false;
    },
    /**
     * 添加分组选项
     */
    handleOk() {
      if (!this.newItem) {
        this.$message.error("分组名为空");
        return;
      }
      if (!this.groupList.includes(this.newItem)) {
        this.groupList.push(this.newItem);
        this.$message.success("创建分组成功");
        this.handleCancel();
      } else {
        this.$message.error("存在相同分组名");
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
