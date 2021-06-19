import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import projets from './projet'

Vue.use(Vuex)


export const projet = new Vuex.Store({
    namespaced: true,
    state: {

    },
    mutations: {

    },
    getters: {

    },
    actions: {

        async envoyer(_, avancementProjet) {
            try {

                const current = new Date();
                console.log(current);
                var mm = current.getMonth();
                var dd = current.getDate();
                if (current.getMonth() < 10) {
                    mm = "0" + current.getMonth();
                }
                if (current.getDate() < 10) {
                    dd = "0" + current.getDate();
                }
                const dateD = `${current.getFullYear()}-${mm}-${dd}`;

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


                console.log('succes');
                const response = await axios.post('http://localhost:8081/avancementProjet/' + avancementProjet.idProjet, {
                    titre: avancementProjet.titre,
                    date_ajout: dateD,
                    score: avancementProjet.score,
                });
                console.log(response);
            } catch (error) {
                console.log('failed')
            }

        },
        async envoyerMessageEmployes(_, avancementProjet) {
            try {

                const current = new Date();
                console.log(current);
                var mm = current.getMonth();
                var dd = current.getDate();
                if (current.getMonth() < 10) {
                    mm = "0" + current.getMonth();
                }
                if (current.getDate() < 10) {
                    dd = "0" + current.getDate();
                }
                const dateD = `${current.getFullYear()}-${mm}-${dd}`;

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                console.log('succes');
                const response = await axios.post('http://localhost:8081/avancementProjet/' + avancementProjet.idProjet, avancementProjet);
                console.log(response);
            } catch (error) {
                console.log('failed')
            }

        },
        async creerTache(_, tache) {
            try {
                console.log('succestache');
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                const response = await axios.post('http://localhost:8081/tache/' + tache.idEmploye + '/' + tache.idProjet, {
                    titre: tache.titre,
                    status: "Created",
                    description: tache.description,
                    date_debut: tache.date_debut,
                    date_fin: tache.date_fin,
                });
                console.log(response);
            } catch (error) {
                console.log('failedTache')
            }
        },
        async envoyertache(_, avancementProjet) {
            try {

                const current = new Date();
                console.log(current);
                var mm = current.getMonth();
                var dd = current.getDate();
                if (current.getMonth() < 10) {
                    mm = "0" + current.getMonth();
                }
                if (current.getDate() < 10) {
                    dd = "0" + current.getDate();
                }
                const dateD = `${current.getFullYear()}-${mm}-${dd}`;

                console.log(avancementProjet.idTache);

                console.log('succes');
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

                const response = await axios.post('http://localhost:8081/avancementTache/' + avancementProjet.idTache, {
                    titre: avancementProjet.titre,
                    date_ajout: dateD,
                    score: avancementProjet.score,
                });
                console.log(response);
            } catch (error) {
                console.log('failed')
            }

        }

    }
})