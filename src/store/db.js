import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export const db = new Vuex.Store({

    state: {
        token: localStorage.getItem('access_token') || null,
        users: [],
        projects: [],
        AvancementProjects: [],
        managers: [],
        admin_name: "",
        total_users: 0,
        prj_proc: 0,
        prj_done: 0,
        prj_total: 0,
        prj_canc: 0,
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        AllUsers(state) {
            return state.users
        },
        AllProjects(state) {
            return state.projects
        },
        AllAvancementProjects(state) {
            return state.AvancementProjects
        },
        Allmanagers(state) {
            return state.managers
        },
        getNameAdmin(state) {
            return state.admin_name
        },
        get_total_users(state) {
            return state.total_users
        },
        get_prj_proc(state) {
            return state.prj_proc
        },
        get_prj_done(state) {
            return state.prj_done
        },
        get_prj_total(state) {
            return state.prj_total
        },
        get_prj_canc(state) {
            return state.prj_canc
        }
    },

    mutations: {
        re_prj_canc(state, nb) {
            state.prj_canc = nb
        },
        re_prj_total(state, nb) {
            state.prj_total = nb
        },
        re_prj_done(state, nb) {
            state.prj_done = nb
        },
        re_prj_proc(state, nb) {
            state.prj_proc = nb
        },
        re_total_users(state, nb) {
            state.total_users = nb
        },
        getAdminName(state, admin) {
            state.admin_name = admin
        },
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
                'nom': user.Nom,
                'prenom': user.Prenom,
                'age': user.Age,
                'email': user.Email,
                'telephone': user.Telephone,
            })
        },
    },
    actions: {


        updateUserMDP(context, nvPass) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            axios.put('http://localhost:8081/users/updateUserMDP/' + nvPass)
                .then(response => {
                    //context.commit('updateUser', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addAdmin(context, credentials) {

            return new Promise((resolve, reject) => {
                axios.post('http://localhost:8081/users', {
                            email: credentials.email,
                            nom: credentials.nom,
                            prenom: credentials.prenom,
                            role: credentials.role,
                            password: credentials.password
                        }, { useCredentails: true },
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
                    }, { useCredentails: true }, { headers: { crossorigin: true } })
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
                            age: credentials.age,
                            email: credentials.email,
                            nom: credentials.nom,
                            prenom: credentials.prenom,
                            role: credentials.role,
                            telephone: credentials.telephone,
                            password: credentials.password
                        }, { useCredentails: true },
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
        async RetrieveUsers(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            const response = await axios.get('http://localhost:8081/users');
            console.log(response.data)
            context.commit('RetrieveUsers', response.data)
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
                    nom: user.nom,
                    prenom: user.prenom,
                    age: user.age,
                    email: user.email,
                    telephone: user.telephone,
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
                            document: credentials.lienDrive
                        }, { useCredentails: true },
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
        async RetrieveProjects(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

            var base64Url = localStorage.getItem('access_token').split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            var email = JSON.parse(jsonPayload).sub
            console.log(email)
            const response = await axios.get('http://localhost:8081/projets/admin/' + email);
            console.log("action RetrieveProjects", response)
            response.data.forEach(element => {
                var aDay = 86400000;
                var diff = Math.floor((Date.parse(element.date_fin) - Date.parse(element.date_debut)) / aDay);
                //console.log(diff)
                element.date_fin = diff;
                element.manager_project = element.manager.nom + " " + element.manager.prenom;
            });
            context.commit('RetrieveProjects', response.data);
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
        RetrieveAvancementProjects(context, id) {
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

            axios.get('http://localhost:8081/users/manager').then(response1 => {

                    axios.get('http://localhost:8081/projets')
                        .then(response => {
                            var managers = [];
                            var managers_id = [];
                            var n_tasks = [];
                            var done = [];
                            var processing = [];
                            var cancelled = [];

                            response.data.forEach(element => {
                                managers.push(element.manager.nom + " " + element.manager.prenom);
                                managers_id.push(element.manager.userId);
                            })

                            managers_id = managers_id.reduce(function(a, b) {
                                if (a.indexOf(b) < 0) a.push(b);
                                return a;
                            }, []);

                            managers = managers.reduce(function(a, b) {
                                if (a.indexOf(b) < 0) a.push(b);
                                return a;
                            }, []);

                            var i = 0;

                            for (let j = 0; j < managers_id.length; j++) {
                                n_tasks[j] = 0;
                                done[j] = 0;
                                processing[j] = 0;
                                cancelled[j] = 0;
                            }

                            managers_id.forEach(element => {
                                response.data.forEach(e => {
                                    if (e.manager.userId == element) {
                                        n_tasks[i] += 1;
                                        if (e.status == "Created") {
                                            processing[i] += 1;
                                        } else if (e.status == "Finished") {
                                            done[i] += 1;
                                        } else {
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

                            var total_users = 0;
                            var prj_proc = 0;
                            var prj_done = 0;
                            var prj_total = 0;
                            var prj_canc = 0;
                            var k = 0;

                            response1.data.forEach(element => {
                                if (element.role == "MANAGER" && managers[k] !== undefined) {
                                    total_users += managers[k];
                                    prj_proc += processing[k];
                                    prj_done += done[k];
                                    prj_total += n_tasks[k];
                                    prj_canc += cancelled[k];

                                    element.name = managers[k];
                                    element.n_tasks = n_tasks[k];
                                    element.done = done[k];
                                    element.processing = processing[k];
                                    element.cancelled = cancelled[k];
                                    element.effictive = (done[k] / n_tasks[k]) * 100;
                                    k++;
                                }

                            })

                            context.commit('re_total_users', k)
                            context.commit('re_prj_proc', prj_proc)
                            context.commit('re_prj_done', prj_done)
                            context.commit('re_prj_total', prj_total)
                            context.commit('re_prj_canc', prj_canc)



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
        getAdminName(context, email) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

            var base64Url = localStorage.getItem('access_token').split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            var email = JSON.parse(jsonPayload).sub

            axios.get('http://localhost:8081/users/' + email)
                .then(response => {

                    console.log(response.data.nom)
                    context.commit('getAdminName', (response.data.prenom + " " + response.data.nom).toUpperCase());
                })
                .catch(error => {
                    console.log(error)
                })
        },

    },

})