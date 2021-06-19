import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './plugins/vuex'
import vuetify from './plugins/vuetify'
import axios from 'axios'




import { db } from './store/db'

import '@/styles/styles.scss'

Vue.config.productionTip = false

axios.defaults.baseURL='http://localhost:8081'


router.beforeEach((to, from, next) => {
  if (!db.getters.loggedIn && to.path != '/auth/signin/identifier' && to.path != '/' && to.path !='/auth/signin/password' && to.path !='/auth/signup') {
    next('/auth/signin/identifier')
    
  } else {
    if(localStorage.getItem('access_token') == null){
      next()
    }else {
      if(parseJwt(localStorage.getItem('access_token')).roles[0].authority  == "ADMIN" && to.path != '/employe' && to.path != '/manager'){
        next()
      }else{
        if(parseJwt(localStorage.getItem('access_token')).roles[0].authority  == "MANAGER" && to.path != '/employe' && to.path != '/dashboard'){
          next()
        }else{
          if(parseJwt(localStorage.getItem('access_token')).roles[0].authority  == "EMPLOYEE" && to.path != '/dashboard' && to.path != '/manager'){
            next()
          }else{
            if(parseJwt(localStorage.getItem('access_token')).roles[0].authority  == "ADMIN"){
              next('/dashboard')
            }else if(parseJwt(localStorage.getItem('access_token')).roles[0].authority  == "EMPLOYE"){
              next('/employe')
            }else if(parseJwt(localStorage.getItem('access_token')).roles[0].authority  == "MANAGER"){
              next('/manager')
            }else
              next('/error')
          }
        }
      }
    }
    
    
  }
})
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}


new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
