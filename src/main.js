// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
/*引入mint-ui*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(MintUI)
import '@/assets/css/reset.css'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
