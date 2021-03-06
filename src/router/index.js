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
import Error from '@/components/admin/error'
import Messages from '@/components/admin/messages'
import CrudUsers from '@/components/admin/crudUsers'
import profilUtilisateur from '@/components/admin/profilUtilisateur'
import profilUtilisateurEmpl from '@/views/Employe/profilUtilisateur'
import profilUtilisateurManager from '@/views/Manager/profilUtilisateur'


import HomePage from '@/views/homePage'
import Employe from '@/views/Employe/Employe'
import projets from '@/views/Employe/projets'
import messages from '@/views/Employe/messages'
import taches from '@/views/Employe/taches'
import avancement from '@/views/Employe/form_avancement'
import Manager from '@/views/Manager/manager'
import messagesManager from '@/views/Manager/messagesManager'
import projetsManager from '@/views/Manager/projetsManager'


Vue.use(VueRouter)

const routes = [{
        path: '/auth',
        component: Auth,
        children: [{
                path: 'signin',
                component: Signin,
                children: [{
                    path: 'identifier',
                    name: 'signin',
                    component: SigninIdentifier
                }, {
                    path: 'password',
                    name: 'password',
                    component: SigninPassword
                }]
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
        path: '/error',
        component: Error,
        name: 'Error'
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
        path: '/profil',
        component:profilUtilisateur,
        name: 'profilUtilisateur'
    },
  
    {
        path: '/profilManager',
        component:profilUtilisateurManager,
        name: 'profilUtilisateur'
    },
    {
        path: '/employe',
        component: Employe,
        name: 'Employe',
        children: [{
            path: 'messages',
            name: 'messagesEmp',
            component: messages
        }, {
            path: 'taches',
            name: 'taches',
            component: taches
        }, {
            path: 'projets',
            name: 'projets',
            component: projets
        },
        {
            path: 'profilEmpl',
            component:profilUtilisateurEmpl,
            name: 'profilUtilisateur'
        }
    ]
    },
    {
        path: '/',
        component: HomePage,
        name: 'HomePage'
    },
    {
        path: '/avancement',
        component: avancement,
        name: 'avancement'
    },
    {
        path: '/manager',
        component: Manager,
        name: 'Manager',
        children: [{
            path: 'messages',
            name: 'messagesManager',
            component: messagesManager
        }, 
         {
            path: 'projets',
            name: 'projets',
            component: projetsManager
        },
        {
            path: 'profilManager',
            component:profilUtilisateurManager,
            name: 'profilUtilisateur'
        }
    ]
    },
    
    /*{
    path: '*',
    redirect: { name: 'signin' }
  }
*/
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router