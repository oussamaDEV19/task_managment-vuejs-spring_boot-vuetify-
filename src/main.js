import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './plugins/vuex'
import vuetify from './plugins/vuetify'

import axios from 'axios'

import { db } from './store/db'

import '@/styles/styles.scss'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!db.getters.loggedIn && to.path != '/auth/signin/identifier' && to.path != '/' && to.path !='/auth/signin/password' && to.path !='/auth/signup') {
    next('/auth/signin/identifier')
    
  } else {
    
    next()
  }
})





new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
