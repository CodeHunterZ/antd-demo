<!-- Vue SFC -->
<template>
  <div id="app">
    <multiselect
      :options="options"
      v-model="value"
      :multiple="true"
      :searchable="true"
      :close-on-select="false"
      :clear-on-select="false"
      :limit="1"
      @update="updateMultiValue"
      placeholder="Pick some"
      :label="label"
      :key="id"
    ></multiselect>
  </div>
</template>

<script>
// import the component
import Multiselect from "vue-multiselect";

export default {
  // register the component
  components: { Multiselect },
  name: "TreeSelectDemo4",
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
    updateMultiValue(value) {
      this.value = value;
    },
  },
};
</script>
