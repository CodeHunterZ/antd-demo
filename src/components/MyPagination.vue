<template>
<!-- 这个是一个分页的组件 -->
<a-pagination
    v-model="current"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    @change="change"
    @showSizeChange="onShowSizeChange"
    :pageSize.sync="currentPageSize"
    :show-total="total => `共 ${total} 条`"
  />
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    value: { // 当前页
      type: Number,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    pagesize: {
      type: Number,
      default: 8,
    },
    pageSizeOptions: {
      type: Array,
      default () {
        return [ '8', '16', '24', '32', ]
      },
    },
    showQuickJumper: {
      type: Boolean,
      default: true,
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      current: this.value,
      currentPageSize: this.pagesize,
    }
  },
  watch: {
    value (val) {
      this.current = val
    },
    pagesize (val) {
      this.currentPageSize = val
    },
  },
  methods: {
    change (pageno, pagesize) { //页码，条数
      this.$emit('change', pageno, pagesize)
    },
    onShowSizeChange (current, size) { //条数变化的回调
      this.$emit('onShowSizeChange', current, size)
    },
  },
}
</script>