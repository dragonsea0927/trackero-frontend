import Vue from 'vue'
import mainApp from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/styles/styles.scss'
Vue.config.productionTip = false

new Vue({
   router,
   store,
   render: h => h(mainApp)
}).$mount('#app')
