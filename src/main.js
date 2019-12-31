import Vue from 'vue'
import App from './App.vue'
import '@/utils/filter'
import VueClipboard from 'vue-clipboard2'
import Message from 'vue-m-message'

Vue.config.productionTip = false

Vue.use(VueClipboard)
Vue.use(Message)

new Vue({
  render: h => h(App),
}).$mount('#app')
