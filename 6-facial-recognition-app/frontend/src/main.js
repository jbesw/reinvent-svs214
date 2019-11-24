import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Nav from './components/Nav.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('Nav', Nav)

// ***************************** >>>>  IMPORTANT! You must update these settings. <<<<< ********************

// Change these URLs to match your deployment API Gateway URL and S3 bucket. (NOTE NO TRAILING SLASH)
Vue.prototype.$API = 'https://1om0pf96q8.execute-api.us-west-2.amazonaws.com/Prod'

// The photos URL format is: 'https://<<bucketname>>.s3.amazonaws.com/BUCKET_NAME/enroll'
Vue.prototype.$PHOTOS_URL = 'https://svs214-ex6.s3.amazonaws.com/enroll'

// ***************************** >>>>  IMPORTANT! You must update these settings. <<<<< ********************

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
