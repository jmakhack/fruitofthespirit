import Vue from 'vue'
import store from './vuex/store'
import App from './components/App'

Vue.config.debug = true
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
