import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/views/Auth/Auth'
import Signin from '@/views/Auth/Signin'
import SigninIdentifier from '@/views/Auth/SigninIdentifier'
import SigninPassword from '@/views/Auth/SigninPassword'
import Signup from '@/views/Auth/Signup'
import Dashboard from '@/views/dashboard'
import Employees from '@/components/admin/employees'
import Tasks from '@/components/admin/tasks'
import Managers from '@/components/admin/managers'
import Messages from '@/components/admin/messages'
import CrudUsers from '@/components/admin/crudUsers'
import HomePage from '@/views/homePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'signin',
        component: Signin,
        children: [
          {
            path: 'identifier',
            name: 'signin',
            component: SigninIdentifier
          }, {
            path: 'password',
            name: 'password',
            component: SigninPassword
          }
        ]
      }, {
        path: 'signup',
        component: Signup,
        name: 'signup'
      },
      
    ],
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard'
  },
  {
    path: '/Tasks',
    component: Tasks,
    name: 'Tasks'
  },
  {
    path: '/Managers',
    component: Managers,
    name: 'Managers'
  },
  {
    path: '/Messages',
    component: Messages,
    name: 'Messages'
  },
  {
    path: '/Employees',
    component: Employees,
    name: 'Employees'
  },
  {
    path: '/Users',
    component: CrudUsers,
    name: 'CrudUsers'
  },
  {
    path: '/',
    component: HomePage,
    name: 'HomePage'
  },
  /*{
    path: '*',
    redirect: { name: 'signin' }
  }
*/
]

const router = new VueRouter({
  routes
})

export default router
