import Vue from 'vue';
import App from './App';
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as ossUtils from '@/utils/ossUtils'
import VueParticles from 'vue-particles'



Vue.use(Antd);
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.ossUtils=ossUtils

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')



