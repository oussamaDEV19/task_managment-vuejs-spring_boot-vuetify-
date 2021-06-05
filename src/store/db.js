import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import projets from './projet'

Vue.use(Vuex)


export const db = new Vuex.Store( {

  state: {
    token: localStorage.getItem('access_token') || null,
    users: []
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    AllUsers(state){
        return state.users
    }
  },

  mutations: {
    destroyToken(state) {
      state.token = null
    },
    retrieveToken(state, token) {
      state.token = token
    },
    RetrieveUsers(state, users) {
        state.users = users
        
      },
    deleteUser(state, id) {
        const index = state.users.findIndex(item => item.id == id)
        state.users.splice(index, 1)
      },
    updateUser(state, user) {
        const index = state.users.findIndex(item => item.id == user.userId)
        state.users.splice(index, 1, {
          'nom' : user.Nom,
          'prenom' : user.Prenom,
          'age' : user.Age,
          'email' : user.Email,
          'telephone' : user.Telephone,
        })
      },
  },
  actions: {
    addAdmin(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8081/users', {
          email:  credentials.email,
          nom:  credentials.nom,
          prenom:  credentials.prenom,
          role: credentials.role,
          password:  credentials.password 
        },
        { useCredentails: true },
       // {headers:{Authorization: "Bearer" + localStorage.getItem('access_token') }}
        )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8081/users/login', {
          email: credentials.email,
          password: credentials.password,
        },
        { useCredentails: true },
        {headers:{crossorigin:true}}
        )
          .then(response => {
            const token = response.data.token
            
            localStorage.setItem('access_token', token)
            console.log(localStorage.getItem('access_token'))
            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    destroyToken(context) {
      
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve()
        })
      }
    },
    addUser(context, credentials) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8081/users', {
            age:  credentials.age,
            email:  credentials.email,
            nom:  credentials.nom,
            prenom:  credentials.prenom,
            role: credentials.role,
            telephone:  credentials.telephone,
            password:  credentials.password
          },
          { useCredentails: true },
         // {headers:{Authorization: "Bearer" + localStorage.getItem('access_token') }}
          )
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
          })
      },
      RetrieveUsers(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
  
        axios.get('http://localhost:8081/users')
        .then(response => {
          //console.log(response.data)
          context.commit('RetrieveUsers', response.data)
        })
        .catch(error => {
          console.log(error)
        })
      },
      deleteUser(context, id) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

        axios.delete('http://localhost:8081/users/' + id)
          .then(response => {
            //context.commit('deleteUser', id)
          })
          .catch(error => {
            console.log(error)
          })
      },
      updateUser(context, user) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
/*
        return new Promise((resolve, reject) => {
          axios.put('http://localhost:8081/users/' + user.userId, {
            nom : user.Nom,
            prenom : user.Prenom,
            age : user.Age,
            email : user.Email,
            telephone : user.Telephone,
          },
          { useCredentails: true },
         // {headers:{Authorization: "Bearer" + localStorage.getItem('access_token') }}
          )
            .then(response => {
              resolve(response)
              context.commit('updateUser', response.data)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
          })
*/
        axios.put('http://localhost:8081/users/' + user.userId, {
          nom : user.nom,
          prenom : user.prenom,
          age : user.age,
          email : user.email,
          telephone : user.telephone,
        })
        .then(response => {
          //context.commit('updateUser', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  
}
)