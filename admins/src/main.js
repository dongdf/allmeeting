import Vue from "vue";
import App from "./app.vue";
import router from "./router/"
import filters from "./common/filters"
import iview from 'iview'
import 'iview/dist/styles/iview.css';
import './assets/comm.scss';
import echarts from 'echarts'
import iviewArea from 'iview-area';
Vue.use(iview);
Vue.use(iviewArea);

import Widgets from './common/index.js'
Vue.use(Widgets)
import http from '@/common/http.js'
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts
//实例化Vue的filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
