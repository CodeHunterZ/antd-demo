import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import testMultiUpload from "@/components/testMultiUpload";
import testUpload from "@/components/testUpload";
import treeSelectDemo from "@/components/treeSelectDemo";
import testLogin from "@/components/testLogin";
import treeSelectDemo2 from "@/components/treeSelectDemo2";
import instructionDemo from "@/components/FeedbackAdd";
import testSelectAddDemo from "@/components/testSelectAddDemo";
import testSelectAddDemo2 from "@/components/testSelectAddDemo2";
import MultiUploadComponets from "@/components/MultiUploadComponets";
import FilesUpload from "@/components/FilesUpload";
import TestTablePage from "@/components/TestTablePage";
import TestPagination from "@/components/TestPagination";
import PaginationDemo from "@/components/PaginationDemo";
import TestPop from "@/components/TestPop";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "testLogin",
      component: testLogin,
    },
    {
      path: "/testUpload",
      name: "testUpload",
      component: testUpload,
    },
    {
      path: "/testMultiUpload",
      name: "testMultiUpload",
      component: testMultiUpload,
    },
    {
      path: "/HelloWorld",
      name: "HelloWorld",
      component: HelloWorld,
    },
    {
      path: "/treeSelectDemo",
      name: "treeSelectDemo",
      component: treeSelectDemo,
    },

    {
      path: "/treeSelectDemo2",
      name: "treeSelectDemo2",
      component: treeSelectDemo2,
    },
    {
      path: "/instructionDemo",
      name: "instructionDemo",
      component: instructionDemo,
    },
    {
      path: "/testSelectAddDemo",
      name: "testSelectAddDemo",
      component: testSelectAddDemo,
    },
    {
      path: "/testSelectAddDemo2",
      name: "testSelectAddDemo2",
      component: testSelectAddDemo2,
    },
    {
      path: "/FilesUpload",
      name: "FilesUpload",
      component: FilesUpload,
    },
    {
      path: "/TestTablePage",
      name: "TestTablePage",
      component: TestTablePage,
    },
    {
      path: "/TestPagination",
      name: "TestPagination",
      component: TestPagination,
    },
    {
      path: "/PaginationDemo",
      name: "PaginationDemo",
      component: PaginationDemo,
    },
    {
      path: "/TestPop",
      name: "TestPop",
      component: TestPop,
    },
  ],
});
