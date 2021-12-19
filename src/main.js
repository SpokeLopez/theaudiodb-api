import Vue from 'vue'
import App from './App.vue'
import './css/tailwind.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')