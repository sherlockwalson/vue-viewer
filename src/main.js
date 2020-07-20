// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import vuex from 'vuex'
import store from './store/store' 
Vue.use(vuex)
Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.use(VueResource);
import * as dicomParser from "dicom-parser";
import * as cornerstone from "../static/viewportSorce/cornerstone.js";
// import * as cornerstone from "./static/viewportSorce/cornerstone.js";
import * as cornerstoneMath from "../static/dist/cornerstoneMath.js";
import * as metaDataProvider from "../static/tool/netlify-example/metaDataProvider.js";
// import * as imageLoader from "./static/tool/netlify-example/imageLoader.js";
import * as hammer from "../static/dist/hammer.js";
import * as cornerstoneTools from 'cornerstone-tools';
import * as exampleImageIdLoader from "../static/viewportSorce/exampleImageIdLoader.js";
import * as cornerstoneWADOImageLoader from "../static/dist/cornerstoneWADOImageLoader.js";
//指定要注册加载程序的基石实例
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstoneMath = cornerstoneMath;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
