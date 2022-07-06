import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import testMultiUpload from '@/components/testMultiUpload'
import testUpload from '@/components/testUpload'
import treeSelectDemo from '@/components/treeSelectDemo'
import testLogin from '@/components/testLogin'
import treeSelectDemo2 from '@/components/treeSelectDemo2'
import instructionDemo from '@/components/FeedbackAdd.vue'
import testSelectAddDemo from '@/components/testSelectAddDemo.vue'
import testSelectAddDemo2 from '@/components/testSelectAddDemo2.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  {
    path: '/',
    name: 'testUpload',
    component: testUpload
  },
  {
    path: '/testMultiUpload',
    name: 'testMultiUpload',
    component: testMultiUpload
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/treeSelectDemo',
    name: 'treeSelectDemo',
    component: treeSelectDemo
  },
  {
    path: '/testLogin',
    name: 'testLogin',
    component: testLogin
  },
  {
    path: '/treeSelectDemo2',
    name: 'treeSelectDemo2',
    component: treeSelectDemo2
  },
  {
    path: '/instructionDemo',
    name: 'instructionDemo',
    component: instructionDemo
  },
  {
    path: '/testSelectAddDemo',
    name: 'testSelectAddDemo',
    component: testSelectAddDemo
  },
  {
    path: '/testSelectAddDemo2',
    name: 'testSelectAddDemo2',
    component: testSelectAddDemo2
  },
  ]
})
