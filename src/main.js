import Vue from 'vue'
import App from './App.vue'
import VueDirectiveMask from 'vue-directive-mask'

Vue.use(VueDirectiveMask)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
