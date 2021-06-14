import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export const db = new Vuex.Store( {

  state: {
    token: localStorage.getItem('access_token') || null,
    users: [],
    projects: [],
    AvancementProjects: [],
    managers: []
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    AllUsers(state){
        return state.users
    },
    AllProjects(state){
      return state.projects
    },
    AllAvancementProjects(state){
      return state.AvancementProjects
    },
    Allmanagers(state){
      return state.managers
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
    RetrieveProjects(state, projects) {
        state.projects = projects
        
      },
      RetrieveManagers(state, managers) {
        state.managers = managers
        
      },
      RetrieveAvancementProjects(state, AvancementProjects) {
        state.AvancementProjects = AvancementProjects
        
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
    addProjet(context, credentials) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8081/projets/' + credentials.ManagerId, {
                titre: credentials.titre,
                status: "Created",
                description: credentials.description,
                date_debut: credentials.date_debut,
                date_fin: credentials.date_fin,
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
    RetrieveProjects(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

      

      axios.get('http://localhost:8081/projets')
      .then(response => {
        
        
        
        response.data.forEach(element => {
          var aDay = 86400000;
        var diff = Math.floor(
          (
            Date.parse(element.date_fin) - Date.parse(element.date_debut)
          ) / aDay);
          //console.log(diff)
          element.date_fin = diff;
          element.manager_project = element.manager.nom + " " + element.manager.prenom;

          
        });

        context.commit('RetrieveProjects', response.data);
        
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteProjet(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

      axios.delete('http://localhost:8081/projets/' + id)
        .then(response => {
          //context.commit('deleteUser', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    RetrieveAvancementProjects(context , id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

      axios.get('http://localhost:8081/avancementProjet/' + id)
      .then(response => {
        
        var i = 0;
        
        response.data.forEach(element => {
          i++;
          const d = new Date(element.date_ajout)
          element.date_ajout = "le " + d.toISOString().split('T')[0];
          element.date_ajout += " à " + d.toISOString().split('T')[1].split(':')[0] + " h"; 
          element.date_ajout += " " + d.toISOString().split('T')[1].split(':')[1] + " min";   
          element.titre = "desc : " + element.titre;
        });
        

        context.commit('RetrieveAvancementProjects', response.data);
        return response.data.max;
      })
      .catch(error => {
        console.log(error)
      })
    },
    RetrieveManagers(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

      axios.get('http://localhost:8081/users').then(response1 => {
        
          axios.get('http://localhost:8081/projets')
        .then(response => {
          var managers = [];
          var managers_id = [];
          const n_tasks = [];
          const done = [];const processing = [];const cancelled = [];

          response.data.forEach(element => {
            managers.push(element.manager.nom + " " +  element.manager.prenom);
            managers_id.push(element.manager.userId);
          })

          managers_id = managers_id.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);

          managers = managers.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);

          var i = 0;

          for (let j = 0; j < managers_id.length; j++) {
            n_tasks[j] = 0;
            done[j] = 0;
            processing[j] = 0;
            cancelled[j] = 0;
          }

          managers_id.forEach(element => {
            response.data.forEach(e => {
              if(e.manager.userId == element){
                n_tasks[i] += 1;
                if(e.status == "Created"){
                  processing[i] += 1;
                }else if(e.status == "Finished"){
                  done[i] += 1;
                }else{
                  cancelled[i] += 1;
                }
              }
              
            })
            i++;
          })

          console.log(managers);
          console.log(managers_id);
          console.log(n_tasks);
          console.log(processing);
          console.log(done);
          console.log(cancelled);
          
          var k = 0;
          response1.data.forEach(element => {
            if(element.role == "MANAGER"){
              element.name =  managers[k];
              element.n_tasks =  n_tasks[k];
              element.done =  done[k];
              element.processing =  processing[k];
              element.cancelled =  cancelled[k];
              element.effictive =  (done[k]/n_tasks[k])*100;
              k++;
            }
              
          })
          
        })
        context.commit('RetrieveManagers', response1.data)
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    },

  },
  
}
)