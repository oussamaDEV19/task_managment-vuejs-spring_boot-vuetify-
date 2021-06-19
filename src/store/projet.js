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


                console.log('succes');
                const response = await axios.post('http://localhost:8081/avancementProjet/' + avancementProjet.idProjet, {
                    titre: avancementProjet.titre,
                    date_ajout: dateD,
                    score: avancementProjet.score,
                }, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdXN0YXBoYTFAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6Ik1BTkFHRVIifV0sImV4cCI6MTYyMzg3OTU3M30.rM-QJy7XPHjDDmo_6QHZ68-JAqkHT_y94Hc1sYBZK7fp3fXpRSY_OL9OXd3YR9J_Lw9uajRFeaX8HMtbxJqzOw ` } });
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


                console.log('succes');
                const response = await axios.post('http://localhost:8081/avancementProjet/' + avancementProjet.idProjet, avancementProjet, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdXN0YXBoYTFAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6Ik1BTkFHRVIifV0sImV4cCI6MTYyMzg3OTU3M30.rM-QJy7XPHjDDmo_6QHZ68-JAqkHT_y94Hc1sYBZK7fp3fXpRSY_OL9OXd3YR9J_Lw9uajRFeaX8HMtbxJqzOw ` } });
                console.log(response);
            } catch (error) {
                console.log('failed')
            }

        },
        async creerTache(_, tache) {
            try {
                console.log('succestache');
                const response = await axios.post('http://localhost:8081/tache/' + tache.idEmploye + '/' + tache.idProjet, {
                    titre: tache.titre,
                    status: "Created",
                    description: tache.description,
                    date_debut: tache.date_debut,
                    date_fin: tache.date_fin,
                }, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdXN0YXBoYTFAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6Ik1BTkFHRVIifV0sImV4cCI6MTYyMzg3OTU3M30.rM-QJy7XPHjDDmo_6QHZ68-JAqkHT_y94Hc1sYBZK7fp3fXpRSY_OL9OXd3YR9J_Lw9uajRFeaX8HMtbxJqzOw ` } });
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
                const response = await axios.post('http://localhost:8081/avancementTache/' + avancementProjet.idTache, {
                    titre: avancementProjet.titre,
                    date_ajout: dateD,
                    score: avancementProjet.score,
                }, { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmFzQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJFTVBMT1lFRSJ9XSwiZXhwIjoxNjI0MDM1NTI2fQ.4TWLXXPMRctpomYaElTvvbJJMkJnkqFZG1scFvm9cd07WVokx6CrxbiQtnXfn5zt4iZ0qE-DB9tldT3_CRzuYw ` } });
                console.log(response);
            } catch (error) {
                console.log('failed')
            }

        }

    }
})